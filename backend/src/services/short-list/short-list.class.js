const axios = require('axios');
const logger = require('../../logger');
/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return 'Nothing here';
  }

  async create(data, params) {
    const student = params.student;
    const userGaokaoId = student.name;

    const requestBody = {
      student_info: {
        ranking: student.basic_info.ranking,
        score: student.basic_info.total_score,
        class_selection: parseInt(student.basic_info.class_selection),
      },
      answers: {
        q2_answer: student.basic_info.college_factors,
        q3_answer: student.basic_info.college_types,
        q4_answer: student.basic_info.college_locations
      }
    };
    logger.info(`学生 '${userGaokaoId}' 正在请求推荐学校`);
    logger.info(JSON.stringify(requestBody, null, 2));
    return axios
      .post(params.data_backend_url, requestBody)
      .then(res => res.data)
      .catch(err => {
        logger.error(`Error message is: '${err.message}'`);
        logger.error(`Request body is: ${JSON.stringify(data)}`);
        return {
          failed: true,
          message: '服务器出错，请稍后再试'
        };
      });
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
