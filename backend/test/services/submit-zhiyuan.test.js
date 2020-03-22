const assert = require('assert');
const app = require('../../src/app');

describe('\'submit-zhiyuan\' service', () => {
  it('registered the service', () => {
    const service = app.service('submit-zhiyuan');

    assert.ok(service, 'Registered the service');
  });
});
