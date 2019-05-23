const crypto = require("crypto");
const User = require("../models/User");
const Dir = require("../models/Dir");
const Queue = require("../services/Queue");
const EmailValidation = require("../jobs/EmailValidation");

class AuthService {
  async createUser(user) {
    const token = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      activeAcountToken: token,
      isSuperUser: false
    });

    await newUser.save();

    this.sendConfirmationEmail(newUser);

    return newUser;
  }

  async createBaseDirs(userId) {
    const root = await Dir.create({
      Dir: "root",
      rootDirId: null,
      userId: userId
    });
    await Dir.create({
      Dir: "musica",
      rootDirId: root.id,
      userId: userId
    });
    await Dir.create({
      Dir: "videos",
      rootDirId: root.id,
      userId: userId
    });
    await Dir.create({
      Dir: "documentos",
      rootDirId: root.id,
      userId: userId
    });
  }

  sendConfirmationEmail(user) {
    Queue.create(EmailValidation.key, {
      user
    }).save(err => {
      if (!!err) console.log(err);
    });
  }
}

module.exports = new AuthService();
