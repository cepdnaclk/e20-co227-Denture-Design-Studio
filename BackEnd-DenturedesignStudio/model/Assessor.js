const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const assessorschema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
});
assessorschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
assessorschema.methods.matchpassword = async function (enterdpassword) {
  return await bcrypt.compare(enterdpassword, this.password);
};
assessorschema.pre("findOneAndUpdate", function (next) {
  this._update.$set = this._update.$set || {};
  this._update.$set.lastAccessed = new Date();
  next();
});

assessorschema.pre("findOne", function (next) {
  this.set({ lastAccessed: new Date() });
  next();
});
const Assessor = mongoose.model("assessor", assessorschema);
module.exports = Assessor;
