// Initializes the `submit-zhiyuan` service on path `/submit-zhiyuan`
const createService = require('./submit-zhiyuan.class.js');
const hooks = require('./submit-zhiyuan.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/submit-zhiyuan', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('submit-zhiyuan');

  service.hooks(hooks);
};
