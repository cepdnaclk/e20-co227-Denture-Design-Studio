const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const ActualcaseSchema = new Schema({
  AnswerUrl: {
    type: String,
  },
  ProblemUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  supportMaterialUrl: {
    type: String,
  },
});
const ActualCase = mongoose.model("ActualCase", ActualcaseSchema);
module.exports = ActualCase;
