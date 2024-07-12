const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProgressschema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  createCase: {
    type: Number,
    default: 0,
  },
  solveCase: {
    type: Number,
    default: 0,
  },
  completedLecture: {
    type: Number,
    default: 0,
  },
  createTime: {
    type: Number,
    default: 0,
  },
  solveTime: {
    type: Number,
    default: 0,
  },
  lectureTime: {
    type: Number,
    default: 0,
  },
});

const UserProgress = mongoose.model("userprogress", userProgressschema);
module.exports = UserProgress;
