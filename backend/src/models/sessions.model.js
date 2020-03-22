module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sessions = new Schema({
    user_id: {
      type: Schema.ObjectId,
      required: true
    },
    session_id: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('sessions', sessions);
};
