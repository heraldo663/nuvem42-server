
const authService = require("../../services/Auth");

class UserController {
  async store(req, res) {
    if (res.locals.isFirstUser) {
      const newUser = await authService.createUser(req.body, true);
      return res.status(201).json(newUser);
    } else {
      const user = await User.find({
        where: { email: req.body.email }
      });
      if (user.length !== 0) {
        return res.status(400).json({
          errors: {
            msg: "Email already registered!"
          }
        });
      } else {
        const newUser = await authService.createUser(req.body, false);
        await authService.createBaseDirs;
        return res.status(201).json(newUser);
      }
    }
  }
}

module.exports = new UserController();
