const logger = require('../logger');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data, params } = context;

    const foundStudents = await app.service('users').find({
      query: {
        gaokao_id: data.gaokao_id,
        birthdate: data.birthdate,
        $limit: 1
      }
    });

    if (foundStudents.total <= 0) {
      logger.info('用户登录失败');
      logger.info(JSON.stringify(data, null, 2));
      context.result = {
        failed: true,
        message: '请确认是否填写了正确的准考证号和生日（如果你连续登录失败，请通过微信号 pku_zhiyuan 联系我们）'
      };
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
        logger.info(`学生 '${updatedStudent.gaokao_id}' 被随机到分组 '${updatedStudent.assigned_group}'`);
        params.student = updatedStudent;
      } else {
        params.student = foundStudent;
      }
      const gaokaoId = params.student.gaokao_id;
      const userGroup = params.student.assigned_group;
      logger.info(`'${userGroup}' 组学生 '${gaokaoId}' 成功登录 ${data.ip} `);
      if (data.ip) {
        const userId = params.student._id;
        var records = params.student.records;
        if (!records) {
          records = []
        }

        records.push({ "timestamp": Date.now(), "ip": data.ip });

        await app.service('users').patch(
          userId,
          { login_records: records },
        )
      }
    }

    return context;
  };
};
