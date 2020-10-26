const mongoose = require("mongoose");

const SurveyResponseSchema = mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  survey_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  satisfied: {
    type: Number,
    required: true,
  },
  not_satisfied: {
    type: Number,
    required: true,
  },
  neutral: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    //  required: true
  },
  course: {
    type: String,
    // required: true
  },
  response: {
    type: Object,
  },
});

module.exports = SurveyResponse = mongoose.model(
  "survey_response",
  SurveyResponseSchema
);
