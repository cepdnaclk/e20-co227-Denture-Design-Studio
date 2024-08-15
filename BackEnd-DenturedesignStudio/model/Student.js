const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  await this.hashPassword();
  next();
});

// Method to hash password
studentSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

// Method to match password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update lastAccessed on findOneAndUpdate
studentSchema.pre("findOneAndUpdate", function (next) {
  this._update.$set = this._update.$set || {};
  this._update.$set.lastAccessed = new Date();
  next();
});

// Update lastAccessed on findOne
studentSchema.pre("findOne", function (next) {
  this.set({ lastAccessed: new Date() });
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
