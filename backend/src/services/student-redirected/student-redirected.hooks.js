const { disallow } = require('feathers-hooks-common');

const validateSession = require('../../hooks/validate-session');

module.exports = {
  before: {
    find: [disallow('external')],
    get: [disallow('external')],
    create: [validateSession()],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
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
