const validateSession = require('../../hooks/validate-session');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateSession()],
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
