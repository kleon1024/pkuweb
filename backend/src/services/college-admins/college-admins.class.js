/* eslint-disable no-unused-vars */
const axios = require('axios');
const logger = require('../../logger');

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
    const requestBody = {
      student_info: {
        gaokao_id: student.gaokao_id
      }
    };

    return axios
      .post(params.data_backend_url, requestBody)
      .then(res => res.data)
      .catch(err => {
        logger.error(`Error message is: '${err.message}'`);
        logger.error(`Request body is: ${JSON.stringify(data)}`);
        logger.error(`Request params is ${JSON.stringify(params)}`);
        return {
          failed: true,
          message: '服务器出错，请稍后再试'
        };
      });
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
