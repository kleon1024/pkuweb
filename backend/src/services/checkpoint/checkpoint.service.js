// Initializes the `checkpoint` service on path `/basic-info`
const createService = require('./checkpoint.class.js');
const hooks = require('./checkpoint.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/checkpoint', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('checkpoint');

  service.hooks(hooks);
};
