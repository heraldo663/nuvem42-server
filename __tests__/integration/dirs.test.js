const request = require("supertest");
const faker = require("faker");
const server = require("../../src/app");
const { factory, admin } = require("../factory");
const Dir = require("../../src/app/models/Dir");

let token, dirId;

beforeAll(async () => {
  await Dir.deleteMany({});

  const user = await factory.create("User", {
    password: "12345678"
  });

  const dir = await factory.create("Dir", {
    owner: user._id
  });

  dirId = dir._id;

  const res = await request(server)
    .post("/sessions")
    .send({
      email: user.email,
      password: "12345678"
    });

  token = res.body.data.token;
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

    expect(res.body.data).toHaveProperty("dir");
    expect(res.body.data.dir.length >= 1).toBeTruthy();
    expect(res.status).toBe(200);
  });

  it("Should get a single Dir", async () => {
    const res = await request(server)
      .get("/dirs/" + dirId)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.data).toHaveProperty("dir");
    expect(res.status).toBe(200);
  });

  it("Should update Dir", async () => {
    const res = await request(server)
      .put("/dirs/" + dirId)
      .send({
        title: "teste"
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.data).toHaveProperty("dir");
    expect(res.body.data.dir.title).toBe("teste");
    expect(res.status).toBe(200);
  });
  it("Should fail to update Dir", async () => {
    const res = await request(server)
      .put("/dirs/" + dirId)
      .send({
        title: ""
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("Should delete a Dir", async () => {
    const res = await request(server)
      .delete("/dirs/" + dirId)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body).toBe("dir");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("dir");
  });

  it("Should fail to delete a  Dir", async () => {
    const res = await request(server)
      .delete("/dirs/" + "12312434")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body).toHaveProperty("errors");
    expect(res.status).toBe(400);
  });
});
