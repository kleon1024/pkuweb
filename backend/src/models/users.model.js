module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    assigned_group: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    class_selection: {
      type: String,
      required: true
    },
    highschool: {
      type: String,
      required: true
    },
    total_score: { type: String, required: true },
    ranking: { type: String, required: true },
    literature_score: { type: String, required: true },
    math_score: { type: String, required: true },
    foreign_language_score: { type: String, required: true },
    zonghe_score: { type: String, required: true },
    extra_score: { type: String, required: true },
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
