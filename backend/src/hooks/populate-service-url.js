// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, params, path } = context;

    params.data_backend_url = `http://${app.get('data_backend_host')}:${app.get(
      'data_backend_port'
    )}/${path}`;

    return context;
  };
};
