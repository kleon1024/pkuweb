const assert = require('assert');
const app = require('../../src/app');

describe('\'basic-info\' service', () => {
  it('registered the service', () => {
    const service = app.service('basic-info');

    assert.ok(service, 'Registered the service');
  });
});
