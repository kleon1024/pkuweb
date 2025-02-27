// Initializes the `college-admins` service on path `/college-admins`
const createService = require('./college-admins.class.js');
const hooks = require('./college-admins.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/college-admins', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('college-admins');

  service.hooks(hooks);
};
