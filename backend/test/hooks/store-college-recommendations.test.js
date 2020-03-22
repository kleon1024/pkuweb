const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const storeCollegeRecommendations = require('../../src/hooks/store-college-recommendations');

describe('\'store-college-recommendations\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: storeCollegeRecommendations()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
