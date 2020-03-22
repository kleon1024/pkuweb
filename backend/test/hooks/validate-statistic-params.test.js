const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validateStatisticParams = require('../../src/hooks/validate-statistic-params');

describe('\'validate-statistic-params\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: validateStatisticParams()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
