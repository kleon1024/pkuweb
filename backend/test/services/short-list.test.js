const assert = require('assert');
const app = require('../../src/app');

describe('\'short-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('short-list');

    assert.ok(service, 'Registered the service');
  });
});
