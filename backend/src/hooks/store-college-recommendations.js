// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      app,
      params,
      result
    } = context;

    if (result.failed) {
      return context;
    }
    const userId = params.student._id;
    await app.service('users').patch(userId, {
      college_recommendations: result
    });

    return context;
  };
};
