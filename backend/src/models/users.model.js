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
      type: Number,
      required: true
    },
    class_number: {
      type: Number,
      required: true
    },
    highschool: {
      type: String,
      required: true
    },
    total_score: { type: Number, required: true },
    ranking: { type: Number, required: true },
    literature_score: { type: Number, required: true },
    math_score: { type: Number, required: true },
    foreign_language_score: { type: Number, required: true },
    zonghe_score: { type: Number, required: true },
    extra_score: { type: Number, required: true },
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
