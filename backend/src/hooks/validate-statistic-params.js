// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      params
    } = context;

    const statisticTypes = [
      'STUDENT_REDIRECT'
    ];

    if (!params.type || !statisticTypes.includes(params.type)) {
      throw new Error(`Service 'statistics' 不支持事件类型 '${params.type}'`);
    }
    return context;
  };
};
