const crypto = require("crypto");
const User = require("../models/User");
const Dir = require("../models/Dir");

class AuthService {
  async createUser(user, isSuperuser) {
    const token = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      activeAcountToken: token,
      isSuperUser: isSuperuser
    });

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
    console.log(user);
  }
}

module.exports = new AuthService();
