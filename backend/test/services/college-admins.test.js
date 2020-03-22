const assert = require('assert');
const app = require('../../src/app');

describe('\'college-admins\' service', () => {
  it('registered the service', () => {
    const service = app.service('college-admins');

    assert.ok(service, 'Registered the service');
  });
});
