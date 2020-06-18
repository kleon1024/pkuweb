module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    assigned_group: {
      type: String,
      required: true
    },
    gaokao_id: {
      type: String,
      required: true
    },
    birthdate: {
      type: String,
      required: true
    },
    payment_method: {
      type: String,
      required: false,
    },
    basic_info: {
      type: Object,
      required: false
    },
    college_recommendations: {
      type: Object,
      required: false
    },
    zhiyuan: {
      type: Object,
      required: false
    },
    login_records: {
      type: Object,
      required: false
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
