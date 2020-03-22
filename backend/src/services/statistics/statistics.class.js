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
    const createdRecord = await this.app.service('statistic-records').create({
      type: params.type,
      user_id: params.user_id,
      content: data
    });

    if (!createdRecord) {
      logger.error(`Service statistics 出错。调用参数: ${JSON.stringify(params)}`);
      logger.error(`需记录数据: ${data}`);
    }

    return createdRecord;
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
