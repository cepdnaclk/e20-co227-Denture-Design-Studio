const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const Lectureschema = new Schema({
  title: {
    require: true,
    type: String,
  },
  videoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});
const lecturecontent = mongoose.model("lecturecontent", Lectureschema);
module.exports = lecturecontent;
