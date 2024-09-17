const mongoose = require("mongoose");
const lecturecontent = require("./Lecturecontent");
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

  solveTime: {
    type: Number,
    default: 0,
  },
  lectureTime: {
    type: Number,
    default: 0,
  },
  watchedVideos: {
    type: [Schema.Types.ObjectId],
    ref: "lecturecontent",
    default: [],
  },
});

const UserProgress = mongoose.model("userprogress", userProgressschema);
module.exports = UserProgress;
