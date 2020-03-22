const { disallow } = require('feathers-hooks-common');
const validateSession = require('../../hooks/validate-session');
const checkCollegeAdminsParams = require('../../hooks/check-college-admins-params');
const populateServiceUrl = require('../../hooks/populate-service-url');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [disallow('external')],
    create: [validateSession(), checkCollegeAdminsParams(), populateServiceUrl()],
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
