// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      data
    } = context;

    const cleanData = {
      gaokao_id: data.gaokao_id,
      birthdate: data.birthdate
    };

    // TODO add check logic

    context.data = cleanData;

    return context;
  };
};
