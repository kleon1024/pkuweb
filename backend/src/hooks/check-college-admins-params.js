// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      params
    } = context;

    // 检查用户session检查后是否拿到了该用户的信息，以及用户是否填写了基本信息
    if (!params.student) {
      context.result = {
        failed: true,
        message: '无该用户信息'
      };
    }
    return context;
  };
};