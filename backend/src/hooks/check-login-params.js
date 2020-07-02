// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      data
    } = context;

    const cleanData = {
      login: data.login,
      ip: data.ip,
    };

    // TODO add check logic

    context.data = cleanData;

    return context;
  };
};
