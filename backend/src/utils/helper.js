module.exports = {
  stripCollegeInfo(colleges) {
    return colleges.map(college => {
      delete college.class_selection;
      delete college.tier;
      delete college.tier_code;
      delete college.ranking;
      delete college.quota;
      delete college.quota_l1;
      delete college.college_overall_rating;
      return college;
    });
  }
};