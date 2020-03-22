const assert = require('assert');
const app = require('../../src/app');

describe('\'statistic-records\' service', () => {
  it('registered the service', () => {
    const service = app.service('statistic-records');

    assert.ok(service, 'Registered the service');
  });
});
