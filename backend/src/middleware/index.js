const cookieParser = require('cookie-parser');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  // add cookie parser middleware and append all the cookies to feathers so cookies can be accessed by hooks
  app.use(cookieParser(), (req, _, next) => {
    req.feathers.cookies = req.cookies;
    next();
  });
};
