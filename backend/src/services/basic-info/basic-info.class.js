/* eslint-disable no-unused-vars */
const logger = require('../../logger');

class Service {
  setup(app) { // need to initialize the service with app parameter because it invokes other services
    this.app = app;
  }

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
    const user_id = params.student._id;
    const userGaokaoId = params.student.name;

    logger.info(`学生 '${userGaokaoId}' 正在更新基本信息`);
    logger.info(JSON.stringify(data, null, 2));

    const res = {
      failed: false,
      message: '成功记录用户基本信息'
    };

    if (params.student.basic_info) {
      logger.warn(`学生 '${userGaokaoId}' 已经有基本信息, 跳过`);
      return res;
    }

    delete params.student;

    const updatedUser = await this.app.service('users').patch(user_id, {
      basic_info: data
    });

    if (!updatedUser) {
      logger.error(`学生 '${userGaokaoId}' 填写基本信息时出错`);
      logger.error(JSON.stringify(data, null, 2));
      res.failed = true;
      res.message = '无法更新，数据库出错';
    }
    return res;
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
