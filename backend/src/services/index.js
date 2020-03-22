const shortList = require('./short-list/short-list.service.js');
const zhiyuanQuiz = require('./zhiyuan-quiz/zhiyuan-quiz.service.js');
const users = require('./users/users.service.js');
const sessions = require('./sessions/sessions.service.js');
const login = require('./login/login.service.js');
const basic_info = require('./basic-info/basic-info.service.js');
const collegeAdmins = require('./college-admins/college-admins.service.js');
const submitZhiyuan = require('./submit-zhiyuan/submit-zhiyuan.service.js');

const statisticRecords = require('./statistic-records/statistic-records.service.js');
const statistics = require('./statistics/statistics.service.js');

const studentRedirected = require('./student-redirected/student-redirected.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(shortList);
  app.configure(zhiyuanQuiz);
  app.configure(users);
  app.configure(sessions);
  app.configure(login);
  app.configure(basic_info);
  app.configure(collegeAdmins);
  app.configure(submitZhiyuan);

  app.configure(statisticRecords);
  app.configure(statistics);

  app.configure(studentRedirected);
};
