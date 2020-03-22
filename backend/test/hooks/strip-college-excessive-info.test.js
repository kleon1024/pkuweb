const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const stripCollegeExcessiveInfo = require('../../src/hooks/strip-college-excessive-info');

describe('\'strip-college-excessive-info\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: stripCollegeExcessiveInfo()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
