const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkCollegeAdminsParams = require('../../src/hooks/check-college-admins-params');

describe('\'check-college-admins-params\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: checkCollegeAdminsParams()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
