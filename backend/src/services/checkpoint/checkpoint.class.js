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

  async get (params) {
    return {
      state: params.student.zhiyuan
    };
  }

  async create (data, params) {
    const user_id = params.student._id;
    const userGaokaoId = params.student.gaokao_id;

    logger.info(`学生 '${userGaokaoId}' 正在保存检查点`);

    const res = {
      failed: false,
      message: '成功记录用户基本信息'
    };

    delete params.student;

    const updatedUser = await this.app.service('users').patch(user_id, {
      zhiyuan: data
    });

    if (!updatedUser) {
      logger.error(`学生 '${userGaokaoId}' 填写基本信息时出错`);
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
