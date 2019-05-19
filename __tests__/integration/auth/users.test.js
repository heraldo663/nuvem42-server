const request = require("supertest");
const faker = require("faker");
const User = require("../../../src/app/models/User");
const Dir = require("../../../src/app/models/Dir");
const server = require("../../../src/app");
const { factory, admin } = require("../../factory");

beforeAll(async () => {
  await User.remove({});
  await factory.create("Admin");
});

describe("register", () => {
  it("should register a normal user", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/users")
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("username");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).not.toHaveProperty("password");
  });
  it("should fail to register normal user whithout password", async () => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email()
    };

    const res = await request(server)
      .post("/users")
      .send(newUser);

    expect(res.body).toHaveProperty("errors");
    expect(res.status).toBe(400);
  });
  it("should fail to register normal user whithout email", async () => {
    const newUser = {
      username: faker.name.firstName(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/users")
      .send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
  it("should fail to register normal user whithout username", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(server)
      .post("/users")
      .send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});
