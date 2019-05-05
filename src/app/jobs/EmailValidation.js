const Mail = require("../services/Mail");

class EmailValidation {
  get key() {
    return "EmailValidation";
  }

  async handle(job, done) {
    const { ad, user, content } = job.data;

    await Mail.sendMail({
      from: '"Nuvem" <nuvem42@hotmail.com>',
      to: ad.author.email,
      subject: `Solicitacao de compra ${ad.title}`,
      template: "confirmEmail",
      context: { user }
    });

    return done();
  }
}

module.exports = new EmailValidation();
