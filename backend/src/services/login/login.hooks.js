const { disallow } = require('feathers-hooks-common');

const checkLoginParams = require('../../hooks/check-login-params');
const validateStudentInfo = require('../../hooks/validate-student-info');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [disallow('external')],
    create: [checkLoginParams(), validateStudentInfo()],
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
