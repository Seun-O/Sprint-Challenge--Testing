const server = require("./server");
const request = require("supertest");
const pg = require("./database");

describe("GET /", () => {
  it("sever should be up and running", done => {
    request(server)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /api/games/", () => {
  const game = {
    title: "The Legend of Zelda",
    genre: "Adventure",
    releaseYear: 2000
  };
  it("should validate required information is provided", async () => {
    const data = await request(server)
      .post("/api/games")
      .send(game);
    expect(data.body).not.toBeEmpty();
  });
  it("should return the correct status code", async () => {
    const data = await request(server)
      .post("/api/games")
      .send(game);
  });

  expect(data.status).toBe(201);
});

describe("GET /api/games/", () => {
  it("should return a list of games and a status code of 200", async () => {
    const data = await request(server).get("/api/games/");
    const games = await pg.find();
    expect(data.body).toEqual(games);
  });
  it("should always return an array", () => {});
});
