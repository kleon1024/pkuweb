const assert = require('assert');
const app = require('../../src/app');

describe('\'zhiyuan-quiz\' service', () => {
  it('registered the service', () => {
    const service = app.service('zhiyuan-quiz');

    assert.ok(service, 'Registered the service');
  });
});
