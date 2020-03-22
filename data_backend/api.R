source("./utils.R")

#* Parse post body using simplifyDataframe = FALSE
#* @filter json parser
function(req) {
  if (req$REQUEST_METHOD == "POST") {
    req$args <- jsonlite::fromJSON(req$postBody, simplifyDataFrame = FALSE)
  }
  plumber::forward()
}

#* Return colleges short list
#* @param student_info user basic information
#* @param answers user answers to the preference questions
#* @post /short-list
function(student_info, answers) {
  get_college_short_list(student_info, answers)
}

#* Return all college admission data
#* @param student_info user basic information
#* @post /college-admins
function(student_info) {
  get_college_admins(student_info)
}
