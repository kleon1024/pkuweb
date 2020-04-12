library(data.table)
library(RMariaDB)
library(tidyverse)
library(rio)

college_qualities <- fread("college_qualities.csv", encoding='UTF-8')
college_qualities <- as.data.table(college_qualities)
print(college_qualities)
export(college_qualities, "college_qualities.rds")

COLLEGE_QUALITIES_1 <- read_rds("college_qualities.rds")
print(COLLEGE_QUALITIES_1)

equiv_scores <- fread("equiv_scores.csv", encoding='UTF-8')
equiv_scores <- as.data.table(equiv_scores)
print(equiv_scores)
export(equiv_scores, "equiv_scores.rds")

college_admissions_simin <- import("college_admins.csv", encoding='UTF-8')
college_admissions_simin <- as.data.table(college_admissions_simin)
print(college_admissions_simin)
export(college_admissions_simin, "college_admins.rds")
