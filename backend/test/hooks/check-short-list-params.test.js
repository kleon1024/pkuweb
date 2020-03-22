const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkShortListParams = require('../../src/hooks/check-short-list-params');

describe('\'check-short-list-params\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: checkShortListParams()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
