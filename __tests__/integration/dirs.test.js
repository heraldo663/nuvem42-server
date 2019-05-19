const request = require("supertest");
const faker = require("faker");
const server = require("../../src/app");
const { factory, admin } = require("../factory");
const Dir = require("../../src/app/models/Dir");

let token;

beforeAll(async () => {
  const user = await factory.create("User", {
    password: "12345678"
  });

  const res = await request(server)
    .post("/sessions")
    .send({
      email: user.email,
      password: "12345678"
    });

  token = res.body.data.token;

  await Dir.deleteMany({});
});

describe("Dirs", () => {
  it("Should create a dir", async () => {
    const res = await request(server)
      .post("/dirs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: faker.lorem.word()
      });

    expect(res.body.data.dir).toHaveProperty("title");
    expect(res.status).toBe(201);
  });

  it("Should fail to create a dir with a empty title", async () => {
    const res = await request(server)
      .post("/dirs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: ""
      });

    expect(res.body).toHaveProperty("errors");
    expect(res.status).toBe(400);
  });

  it("Should get all user Dirs", async () => {
    const res = await request(server)
      .get("/dirs")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
