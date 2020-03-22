const logger = require('../../logger');
/* eslint-disable no-unused-vars */
class Service {
  setup(app) {
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
    const userId = params.student._id;
    const userGaokaoId = params.student.gaokao_id;

    logger.info(`学生 '${userGaokaoId}' 正在跳转至斯民官网。跳转原因: '${data.reason.description}'`);
  
    const createdStatisticRecord = await this.app.service('statistics').create(data, {
      type: 'STUDENT_REDIRECT',
      user_id: userId
    });

    delete params.student;

    const res = {
      failed: false,
      message: '成功记录跳转记录'
    };

    if (!createdStatisticRecord) {
      logger.error(`学生 '${userGaokaoId}' 记录跳转原因时调用 service 'statistics' 出错`);
      res.failed = true;
      res.message = '无法记录，数据库出错';
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
