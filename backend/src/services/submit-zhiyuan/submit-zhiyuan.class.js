/* eslint-disable no-unused-vars */
const logger = require('../../logger');

class Service {
  setup(app) {
    // need to initialize the service with app parameter because it invokes other services
    this.app = app;
  }

  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    const userId = params.student._id;
    const userGaokaoId = params.student.gaokao_id;

    logger.info(`学生 '${userGaokaoId}' 正在提交志愿`);

    logger.info(
      JSON.stringify(
        data.zhiyuan.zhiyuan_colleges.map(college => {
          return {
            college: college.college,
            college_code: college.college_code,
            campus_code: college.campus_code,
            order: college.order,
            probability: college.probability,
            strategy: college.strategy
          };
        }),
        null,
        2
      )
    );

    const res = {
      failed: false,
      message: '成功记录用户志愿'
    };

    if (params.student.zhiyuan) {
      logger.warn(`学生 '${userGaokaoId}' 已经填写过志愿, 跳过`);
      return res;
    }

    delete params.student;

    const payload = {
      zhiyuan: data.zhiyuan
    };

    if (data.payment_method) {
      payload.payment_method = data.payment_method;
      logger.info(
        `学生 '${userGaokaoId}' 正在提交支付方式: ${data.payment_method}`
      );
    }

    const updatedUser = await this.app.service('users').patch(userId, payload);

    if (!updatedUser) {
      logger.error(`学生 '${userGaokaoId}' 提交志愿时出错`);
      logger.error(JSON.stringify(data.zhiyuan, null, 2));
      res.failed = true;
      res.message = '无法更新，数据库出错';
    }
    return res;
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
