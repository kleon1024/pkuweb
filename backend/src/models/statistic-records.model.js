module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const statisticRecords = new Schema({
    type: { // 什么类型的事件
      type: String,
      required: true
    },
    user_id: { // 有的情况下可能没有用户信息，可能只是未登录用户访问
      type: Schema.ObjectId,
      required: false
    },
    content: { // 所有内容，不能为空
      type: Object,
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('statistic_records', statisticRecords);
};
