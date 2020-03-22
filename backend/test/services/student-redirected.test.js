const assert = require('assert');
const app = require('../../src/app');

describe('\'student-redirected\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-redirected');

    assert.ok(service, 'Registered the service');
  });
});
