const { stripCollegeInfo } = require('../utils/helper');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      result
    } = context;

    if (result.recommended_colleges) {
      result.recommended_colleges = stripCollegeInfo(result.recommended_colleges);
    }

    if (result.other_colleges) {
      result.other_colleges = stripCollegeInfo(result.other_colleges);
    }

    return context;
  };
};
