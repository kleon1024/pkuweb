const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [disallow('external')], // 只能内部访问，该服务主要用来记录各种访问数据
    find: [],
    get: [],
    create: [],
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
