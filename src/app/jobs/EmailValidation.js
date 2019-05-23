const Mail = require("../services/Mail");
const config = require("../../config");

class EmailValidation {
  get key() {
    return "EmailValidation";
  }

  async handle(job, done) {
    const { user } = job.data;
    try {
      await Mail.sendMail({
        from: '"Nuvem" <nuvem42@hotmail.com>',
        to: user.email,
        subject: `Verificação de email`,
        template: "confirmEmail",
        context: {
          username: user.username,
          url: `${config.app.baseURL}users/${user.activeAcountToken}`
        }
      });
    } catch (error) {
      console.log(error);
    }

    return done();
  }
}

module.exports = new EmailValidation();
