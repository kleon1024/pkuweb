// Initializes the `basic-info` service on path `/basic-info`
const createService = require('./basic-info.class.js');
const hooks = require('./basic-info.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/basic-info', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('basic-info');

  service.hooks(hooks);
};
