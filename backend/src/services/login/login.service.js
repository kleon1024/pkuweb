// Initializes the `login` service on path `/login`
const createService = require('./login.class.js');
const hooks = require('./login.hooks');
const randomstring = require('randomstring');

const logger = require('../../logger');
module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/login', createService(options), (req, res, next) => {
    if (!res.data.failed) {
      const session_id = randomstring.generate(64);
      const cookieOptions = {
        domain: app.get('cookie_domain'),
        expires: new Date(Date.now() + 86400000), // 一天之后
        httpOnly: false
      };

      logger.info(`学生 '${res.data.name}' 正在登录的 Session 为: '${session_id}'`);
      res.cookie('SIMIN-NX-SESSION', session_id, cookieOptions);
      app.service('sessions').create({
        user_id: res.data._id,
        session_id: session_id
      }).then(() => {
        logger.info(`学生 '${res.data.name}' 的 Session: '${session_id}' 被正确记录`);
      });
      delete res.data._id;
      delete res.updatedAt;
    }
    next();
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('login');

  service.hooks(hooks);
};
