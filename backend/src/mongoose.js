const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function(app) {
  mongoose.connect(app.get('mongodb'), { useNewUrlParser: true }, err => {
    if (err) {
      logger.error(`Error connecting to Mongo: ${err.message}`);
      process.exit(1);
    }
    logger.info('Connected to Mongo');
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
