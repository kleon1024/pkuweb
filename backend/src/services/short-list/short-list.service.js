// Initializes the `short-list` service on path `/short-list`
const createService = require('./short-list.class.js');
const hooks = require('./short-list.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/short-list', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('short-list');

  service.hooks(hooks);
};
