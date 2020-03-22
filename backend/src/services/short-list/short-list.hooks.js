const { disallow } = require('feathers-hooks-common');
const validateSession = require('../../hooks/validate-session');
const checkShortListParams = require('../../hooks/check-short-list-params');
const populateServiceUrl = require('../../hooks/populate-service-url');

const stripCollegeExcessiveInfo = require('../../hooks/strip-college-excessive-info');
const storeCollegeRecommendations = require('../../hooks/store-college-recommendations');

module.exports = {
  before: {
    all: [],
    find: [disallow('external')],
    get: [disallow('external')],
    create: [validateSession(), checkShortListParams(), populateServiceUrl()],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      storeCollegeRecommendations(),
      stripCollegeExcessiveInfo()
    ],
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
