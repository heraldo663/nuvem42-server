const crypto = require("crypto");
const { User, Bucket } = require("../models");

class UserController {
  async store(req, res) {
    if (res.locals.isFirstUser) {
      const newSuperUser = await this.createUser(req.body, true);
      this.sendConfirmationEmail(newSuperUser);
      return res.status(201).json(newSuperUser);
    } else {
      const user = await User.findOne({
        where: { email: req.body.email }
      });

      if (user) {
        return res.status(400).json({
          errors: {
            msg: "Email already registered!"
          }
        });
      } else {
        const newNormalUser = await this.createUser(req.body, false);
        await this.createBaseBuckets(newNormalUser.id);
        this.sendConfirmationEmail(newNormalUser);
        return res.status(201).json(newNormalUser);
      }
    }
  }

  createUser(user, isSuperuser) {
    const token = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    const newUser = User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      activeAcountToken: token,
      isSuperUser: isSuperuser
    });

    return newUser;
  }

  async createBaseBuckets(userId) {
    const root = await Bucket.create({
      bucket: "root",
      rootBucketId: null,
      userId: userId
    });
    await Bucket.create({
      bucket: "musica",
      rootBucketId: root.id,
      userId: userId
    });
    await Bucket.create({
      bucket: "videos",
      rootBucketId: root.id,
      userId: userId
    });
    await Bucket.create({
      bucket: "documentos",
      rootBucketId: root.id,
      userId: userId
    });
  }

  async sendConfirmationEmail() {}
}

module.exports = new UserController();
