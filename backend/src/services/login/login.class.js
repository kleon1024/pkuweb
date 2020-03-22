const { stripCollegeInfo } = require('../../utils/helper');
const logger = require('../../logger');
/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    const student = params.student;

    const collegeRecommendations = student.college_recommendations;
    if (collegeRecommendations) {
      if (collegeRecommendations.recommended_colleges) {
        collegeRecommendations.recommended_colleges = stripCollegeInfo(collegeRecommendations.recommended_colleges);
      }
      if (collegeRecommendations.other_colleges) {
        collegeRecommendations.other_colleges = stripCollegeInfo(collegeRecommendations.other_colleges);
      }
      logger.info('该考生之前已经有推荐学校，名单如下:');
      logger.info(JSON.stringify(collegeRecommendations.recommended_colleges, null, 2));
    }
    if (student.zhiyuan) {
      logger.info('该考生之前已经提交过志愿表如下:');
      logger.info(JSON.stringify(student.zhiyuan.zhiyuan_colleges, null, 2));
    }
    return student;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
