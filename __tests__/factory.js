const { factory } = require("factory-girl");
const User = require("../src/app/models/User");
const faker = require("faker");

const admin = {
  username: "admin",
  email: "admin@admin.com",
  password: "123456"
};

factory.define("User", User, {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isSuperUser: false,
  isUserActive: true
});

factory.define("Admin", User, {
  username: admin.username,
  email: admin.email,
  password: admin.password,
  isSuperUser: true,
  isUserActive: true
});

module.exports = {
  factory,
  admin
};
