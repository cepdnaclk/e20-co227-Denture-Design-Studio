const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const studentschema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
});

studentschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentschema.methods.matchpassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentschema.pre("findOneAndUpdate", function (next) {
  this._update.$set = this._update.$set || {};
  this._update.$set.lastAccessed = new Date();
  next();
});

studentschema.pre("findOne", function (next) {
  this.set({ lastAccessed: new Date() });
  next();
});

const Student = mongoose.model("Student", studentschema);
module.exports = Student;
