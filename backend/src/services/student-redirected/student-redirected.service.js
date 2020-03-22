// Initializes the `student-redirected` service on path `/student-redirected`
const createService = require('./student-redirected.class.js');
const hooks = require('./student-redirected.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/student-redirected', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-redirected');

  service.hooks(hooks);
};
