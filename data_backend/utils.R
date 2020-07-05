library(data.table)
library(RMariaDB)
library(tidyverse)


PRODUCTION <- Sys.getenv("API_ENV") == "production"

APP_YEAR <- 2019 # change it to 2019 when done
DATA_BASE_DIR <- ifelse(PRODUCTION, "/app/data_backend/data", "data")

RISK_THRES <- 3
SAFE_THRES <- 3

EQUIV_SCORES <- read_rds(file.path(DATA_BASE_DIR, "equiv_scores.rds"))
setkeyv(EQUIV_SCORES, c("class_selection", "year")) # set class_selection and year as keys for faster search

convert_equiv_score <- function(student_info, to_year = APP_YEAR - 1) {
  student_ranking <- student_info$ranking
  student_class_selection <- student_info$class_selection
  student_score <- student_info$score

  converted_score <- EQUIV_SCORES[
    .(student_class_selection, to_year)
  ][
    ranking_f1 < student_ranking & ranking >= student_ranking
  ][, score]

  ifelse(!is.na(converted_score), converted_score, student_score)
}

COLLEGE_ADMINS <- read_rds(file.path(DATA_BASE_DIR, "college_admins.rds")) # 大学录取数据

setkeyv(COLLEGE_ADMINS, c("class_selection")) # set class_selection and year as keys for faster search

norm_prob <- function(p_max, p_min, val, range) {
  lower <- range[1]
  upper <- range[2]
  if (p_max == p_min) {
    ifelse(val > upper, upper, ifelse(val < lower, lower, val))
  } else {
    (val - p_min) / (p_max - p_min) * (upper - lower) + lower
  }
}

add_probabilities <- function(data, student_equiv_score) {
  data$probability <- map2_dbl(data$admission_mean_score, data$quota, function(ad_mean, q) {
    diff <- student_equiv_score - ad_mean
    diff <- ifelse(diff > 0, diff, diff / 2.5)
    avg_quota <- q / 3000
    prob <- 1 / (1 + 1 / exp(diff + avg_quota))
    round(
      ifelse(
        prob > 0.9995,
        0.9995,
        ifelse(prob < 0.05, 0.05, prob)
      ),
      4
    )
  })

  if (nrow(data) <= 0) {
    return(data)
  }

  probs <- data$probability
  probs_min <- min(probs)
  probs_max <- max(probs)

  data %>% mutate(
    probability = case_when(
      strategy == "冲" ~ norm_prob(probs_max, probs_min, probability, c(0.05, 0.4)),
      strategy == "稳" ~ norm_prob(probs_max, probs_min, probability, c(0.4, 0.95)),
      strategy == "保" ~ norm_prob(probs_max, probs_min, probability, c(0.95, 0.9995))
    )
  )
}

add_college_strategies <- function(data, equiv_score_l0, equiv_score_l1) {
  data$strategy <- c(1:nrow(data)) %>% map_chr(function(i) {
    # 获取当前学校两年的平均分
    ad_mean_0 <- data$admission_mean_score[i]
    ad_mean_1 <- data$admission_mean_score_l1[i]

    # 获取当前学校两年的分数线
    ad_min_0 <- data$admission_min_score[i]
    ad_min_1 <- data$admission_min_score_l1[i]

    if (!is.na(ad_mean_0) && !is.na(ad_mean_1)) { # 有两年录取平均分
      ifelse(
        equiv_score_l0 - ad_mean_0 >= 2 && equiv_score_l1 - ad_mean_1 >= 2,
        "保",
        ifelse(
          equiv_score_l0 >= ad_min_0 - 10 || equiv_score_l1 >= ad_min_1 - 10, # 冲和稳必须都满足这个条件
          ifelse(
            ad_mean_0 - equiv_score_l0 >= 3 && ad_mean_1 - equiv_score_l1 >= 3,
            "冲",
            "稳"
          ),
          NA
        )
      )
    } else if (!is.na(ad_mean_0)) { # 只有去年数据
      ifelse(
        equiv_score_l0 - ad_mean_0 >= 3,
        "保",
        ifelse(
          equiv_score_l0 >= ad_min_0 - 10, # 冲和稳必须都满足这个条件
          ifelse(ad_mean_0 - equiv_score_l0 >= 3, "冲", "稳"),
          NA
        )
      )
    } else if (!is.na(ad_mean_1)) { # 只有前年数据
      ifelse(
        equiv_score_l1 - ad_mean_1 >= 3,
        "保",
        ifelse(
          equiv_score_l1 >= ad_min_1 - 10, # 冲和稳必须都满足这个条件
          ifelse(ad_mean_1 - equiv_score_l1 >= 3, "冲", "稳"),
          NA
        )
      )
    } else { # 两年数据都没有
      NA
    }
  })
  data
}

COLLEGE_QUALITIES <- read_rds(file.path(DATA_BASE_DIR, "college_qualities.rds")) # 大学质量指标数据

COLLEGE_TYPE_MAPPINGS <- jsonlite::fromJSON("college_types.json") %>% deframe() # 类型的对应关系 "A -> 综合类" 等等
COLLEGE_CITY_MAPPINGS <- jsonlite::fromJSON("cities.json", simplifyVector = FALSE)

COLLEGE_FACTOR_WEIGHTS <- c(40, 20, 10) # 最重要的指标 * 40 + 第二重要的指标 * 20 + 第三重要的指标 * 10
COLLEGE_TYPE_WEIGHTS <- c(1.5, 0.75, 0.3) # 最想去的类型 = 1.5，第二想去类型 = 0.75，第三想去类型 = 0.3，其余 = 0
COLLEGE_CITY_WEIGHTS <- c(1.5, 0.75, 0.3) # 最想去的地方 = 1.5，第二想去地方 = 0.75，第三想去地方 = 0.3，其余 = 0

# Don't merge with the above line
COLLEGE_CITY_MAPPINGS <- COLLEGE_CITY_MAPPINGS %>%
  map(function(city_list) {
    city_list$options %>% map_chr(~ .$city_code)
  }) %>%
  set_names(COLLEGE_CITY_MAPPINGS %>% map_chr(~ .$key))

# 所有可能的高校因素
COLLEGE_FACTOR_KEYS <- c(
  "A" = "qual_student_standardized",
  "B" = "qual_reputation_standardized",
  "C" = "qual_research_standardized",
  "D" = "qual_graduate_standardized",
  "E" = "grad_sch",
  "F" = "col_985",
  "G" = "col_211",
  "H" = "first_tier",
  "I" = "type_weight",
  "J" = "city_weight",
  "K" = "major_weight"
)

get_user_factor_weights <- function(q2_answer) {
  # set proper factor keys as names of the factor weights
  COLLEGE_FACTOR_WEIGHTS %>% set_names(COLLEGE_FACTOR_KEYS[q2_answer])
}
get_type_weight <- function(q3_answer) { # 根据院校类型和考生的选择的院校顺序，决定该院校的基础权重
  college_type_index <- match(COLLEGE_QUALITIES$type, COLLEGE_TYPE_MAPPINGS[q3_answer])
  ifelse(
    is.na(college_type_index),
    0,
    COLLEGE_TYPE_WEIGHTS[college_type_index]
  )
}

get_single_city_weight <- function(city_code, q4_answer) {
  city_code_presence <- q4_answer %>%
    map_lgl(~ city_code %in% COLLEGE_CITY_MAPPINGS[[.]]) # 对每一个选择了的城市列表，检查当前城市代码是否在该列表中
  college_city_index <- match(TRUE, city_code_presence)
  ifelse(
    is.na(college_city_index),
    0,
    COLLEGE_CITY_WEIGHTS[college_city_index]
  )
}

# 根据院校所在城市在考生所选城市偏好中的顺序，决定该院校的地理位置基础权重
get_city_weight <- function(q4_answer) {
  COLLEGE_QUALITIES$city_code %>% map_dbl(~ get_single_city_weight(., q4_answer))
}

search_colleges <- function(equiv_score_l0, equiv_score_l1, student_class_selection) {
  COLLEGE_ADMINS[.(student_class_selection)] %>%
    add_college_strategies(equiv_score_l0, equiv_score_l1) %>%
    filter(!is.na(strategy)) %>%
    add_probabilities(equiv_score_l0)
}

sample_or_random <- function(df, sample_size = NULL) {
  df_size <- nrow(df)
  sample_size <- ifelse(is.null(sample_size), df_size, sample_size)
  if (df_size < sample_size) {
    sample_n(df, df_size)
  } else {
    sample_n(df, sample_size)
  }
}

RISK_NUMBER <- c(5, 10)
LEVEL_NUMBER <- c(4, 8)
SAFE_NUMBER <- c(3, 6)

get_college_short_list <- function(student_info, answers) {
  q2_answer <- answers$q2_answer # order of most important college preference factors. Can be any combination of A to H (no duplicates)
  user_factor_weights <- get_user_factor_weights(q2_answer)

  college_qualities_per_answers <- COLLEGE_QUALITIES
  # 处理院校类型
  if (!is.na(user_factor_weights["type_weight"])) { # 院校类型在q2中被选择
    college_qualities_per_answers$type_weight <- get_type_weight(answers$q3_answer)
  }

  if (!is.na(user_factor_weights["city_weight"])) { # 院校地理位置在q2中被选择
    college_qualities_per_answers$city_weight <- get_city_weight(answers$q4_answer)
  }

  if (!is.na(user_factor_weights["major_weight"])) { # 院校专业在q2中被选择
    college_qualities_per_answers$major_weight <- 0
  }

  college_qualities_matrix <- college_qualities_per_answers %>% # 将需要用到的数据转换为矩阵
    select(one_of(names(user_factor_weights))) %>%
    as.matrix()

  college_weighted_ratings <- college_qualities_matrix %*% user_factor_weights # 通过矩阵点乘同时获取所有学校的分数

  college_qualities_per_answers$college_overall_rating <- college_weighted_ratings[, 1]

  colleges_with_rating <- college_qualities_per_answers %>%
    select(college_code, college_overall_rating)

  # 转换出考生去年
  equiv_score_l0 <- convert_equiv_score(student_info)
  # 和前年的等位分
  equiv_score_l1 <- convert_equiv_score(student_info, APP_YEAR - 2)

  candidate_colleges <- search_colleges(equiv_score_l0, equiv_score_l1, student_info$class_selection) %>%
    inner_join(colleges_with_rating, by = "college_code") %>%
    arrange(desc(college_overall_rating)) %>%
    mutate(row_number = row_number())

  risk_candidates <- candidate_colleges %>%
    filter(strategy == "冲")
  level_candidates <- candidate_colleges %>%
    filter(strategy == "稳")
  safe_candidates <- candidate_colleges %>%
    filter(strategy == "保")

  risk_colleges <- risk_candidates %>%
    slice(1:RISK_NUMBER[2]) %>% # 备选10所
    sample_or_random(RISK_NUMBER[1]) # 随机选取其中5所

  level_colleges <- level_candidates %>%
    slice(1:LEVEL_NUMBER[2]) %>% # 备选8所
    sample_or_random(LEVEL_NUMBER[1]) # 随机选取其中4所

  safe_colleges <- safe_candidates %>%
    slice(1:SAFE_NUMBER[2]) %>% # 备选6所
    sample_or_random(SAFE_NUMBER[1]) # 随机选取其中3所

  recommended_colleges <- bind_rows(
    risk_colleges,
    level_colleges,
    safe_colleges
  ) %>% sample_or_random()

  list(
    "equiv_score_last_year" = jsonlite::unbox(equiv_score_l0),
    "equiv_score_two_years_ago" = jsonlite::unbox(equiv_score_l1),
    "risk_number" = jsonlite::unbox(nrow(risk_colleges)),
    "level_number" = jsonlite::unbox(nrow(level_colleges)),
    "safe_number" = jsonlite::unbox(nrow(safe_colleges)),
    "recommended_colleges" = recommended_colleges %>% select(-row_number),
    "other_colleges" = candidate_colleges %>% slice(-recommended_colleges$row_number) %>% select(-row_number)
  )
}

get_college_admins <- function(student_info = NULL) {
  COLLEGE_ADMINS %>%
    select(-one_of(c("class_selection", "tier", "tier_code", "ranking", "quota", "quota_l1"))) %>%
    distinct(college_code, campus_code, .keep_all = TRUE)
}
