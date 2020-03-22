// Initializes the `zhiyuan-quiz` service on path `/zhiyuan-quiz`
const createService = require('./zhiyuan-quiz.class.js');
const hooks = require('./zhiyuan-quiz.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/zhiyuan-quiz', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('zhiyuan-quiz');

  service.hooks(hooks);
};
