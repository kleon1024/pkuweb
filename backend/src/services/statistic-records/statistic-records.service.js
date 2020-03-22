// Initializes the `statistic-records` service on path `/statistic-records`
const createService = require('feathers-mongoose');
const createModel = require('../../models/statistic-records.model');
const hooks = require('./statistic-records.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/statistic-records', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('statistic-records');

  service.hooks(hooks);
};
