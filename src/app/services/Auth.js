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

    await this.createBaseDirs(newUser._id);

    this.sendConfirmationEmail(newUser);

    return newUser;
  }

  async createBaseDirs(userId) {
    try {
      const root = await Dir.create({
        title: "root",
        root: null,
        owner: userId
      });
      await Dir.create({
        title: "musica",
        root: root.id,
        owner: userId
      });
      await Dir.create({
        title: "videos",
        root: root.id,
        owner: userId
      });
      await Dir.create({
        title: "documentos",
        root: root.id,
        owner: userId
      });
    } catch (error) {
      console.log(error);
    }
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
