const logger = require('../logger');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data, params } = context;

    const foundStudents = await app.service('users').find({
      query: {
        name: data.login.name,
        class_selection: data.login.class_selection,
        class_number: data.login.class_number,
        highschool: data.login.highschool,
        total_score: data.login.total_score,
        ranking: data.login.ranking,
        literature_score: data.login.literature_score,
        math_score: data.login.math_score,
        foreign_language_score: data.login.foreign_language_score,
        zonghe_score: data.login.zonghe_score,
        extra_score: data.login.extra_score,
        $limit: 1
      }
    });

    if (foundStudents.total <= 0) {
      const studentGroups = app.get('student_groups');
      const randomGroup = studentGroups[Math.floor(Math.random() * studentGroups.length)];
      const createdStudent = await app.service('users').create({
        name: data.login.name,
        class_selection: data.login.class_selection,
        class_number: data.login.class_number,
        highschool: data.login.highschool,
        total_score: data.login.total_score,
        ranking: data.login.ranking,
        literature_score: data.login.literature_score,
        math_score: data.login.math_score,
        foreign_language_score: data.login.foreign_language_score,
        zonghe_score: data.login.zonghe_score,
        extra_score: data.login.extra_score,
        assigned_group: randomGroup,
      });
      params.student = createdStudent;
    } else {
      const foundStudent = foundStudents.data[0];
      if (!foundStudent.assigned_group) {
        // 尚未分组，意味从未登录过
        const studentGroups = app.get('student_groups');
        const randomGroup = studentGroups[Math.floor(Math.random() * studentGroups.length)];
        const updatedStudent = await app
          .service('users')
          .patch(foundStudent._id, {
            assigned_group: randomGroup
          });
        logger.info(`学生 '${updatedStudent.name}' 被随机到分组 '${updatedStudent.assigned_group}'`);
        params.student = updatedStudent;
      } else {
        params.student = foundStudent;
      }
    }

    const name = params.student.name;
    const userGroup = params.student.assigned_group;
    logger.info(`'${userGroup}' 组学生 '${name}' 成功登录 ${data.ip} `);
    if (data.ip) {
      const userId = params.student._id;
      var records = params.student.login_records;
      if (!records) {
        records = []
      }

      records.push({ "timestamp": Date.now(), "ip": data.ip });

      await app.service('users').patch(
        userId,
        { login_records: records },
      )
    }

    return context;
  };
};
