const { disallow } = require('feathers-hooks-common');

const validateStatisticParams = require('../../hooks/validate-statistic-params');

module.exports = {
  before: {
    all: [disallow('external')], // 只能内部访问
    find: [],
    get: [],
    create: [validateStatisticParams()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
