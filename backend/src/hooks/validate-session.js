const logger = require('../logger');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, params } = context;

    const cookies = params.cookies;

    const sessionId = cookies['SIMIN-NX-SESSION'];
    if (!sessionId) {
      logger.info('没有session cookie的请求，不是好事');
      context.result = {
        failed: true,
        message: '无法访问：尚未登录或登录已失效'
      };
    } else {
      const foundSessions = await app.service('sessions').find({
        query: {
          session_id: sessionId,
          $limit: 1
        }
      });
      if (foundSessions.total <= 0) {
        logger.info(`伪造或者过期了的session: '${sessionId}'`);
        context.result = {
          failed: true,
          message: '无法访问：尚未登录或登录已失效。如果多人使用一个电脑，请确保点击 "退出登录" 后再使用'
        };
      } else {
        const user_id = foundSessions.data[0].user_id;
        const foundStudent = await app.service('users').get(user_id);
        if (!foundStudent) {
          logger.info(`曾经登录过的用户却没有找到该用户。数据库出错了。登录session: '${sessionId}'`);
          context.result = {
            failed: true,
            message: '不存在这个用户'
          };
        }
        params.student = foundStudent;
        logger.info(`学生 '${foundStudent.gaokao_id}' 发起了一次请求，路径: '${context.path}'`);
      }
    }

    return context;
  };
};
