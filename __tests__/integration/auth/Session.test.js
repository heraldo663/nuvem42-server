const request = require("supertest");
const faker = require("faker");
const User = require("../../../src/app/models/User");
const server = require("../../../src/app");
const { factory, admin } = require("../../factory");

beforeAll(async () => {
  await User.remove({});

  const newUser = new User({
    username: admin.username,
    email: admin.email,
    password: admin.password,
    isSuperUser: true,
    isUserActive: true
  });

  await newUser.save();
});

describe("Login", () => {
  it("Should login an user", async () => {
    const res = await request(server)
      .post("/sessions")
      .send({
        email: admin.email,
        password: admin.password
      });

    expect(res.body.data).toHaveProperty("token");
    expect(res.status).toBe(200);
  });
});
