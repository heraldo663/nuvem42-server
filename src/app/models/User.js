const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String
  },
  activeAcountToken: {
    type: String
  },
  passwordResetTokenExpires: {
    type: Date
  },
  isSuperUser: {
    type: Boolean,
    default: false
  },
  isUserActive: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, config.auth.secret, {
      expiresIn: config.auth.ttl
    });
  },
  generateRefreshToken({ id }) {
    return jwt.sign({ id }, config.auth.secret, {
      expiresIn: config.auth.ttl * 24 * 30
    });
  }
};

module.exports = mongoose.model("User", UserSchema);
