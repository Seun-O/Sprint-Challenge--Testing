const server = require("./server");
const request = require("supertest");
const pg = require("./database");

beforeEach(async () => {
  await pg.db("games").truncate();
  await pg.addGame({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
});

describe("GET /", () => {
  it("sever should be up and running", done => {
    request(server)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

/**
 * Test `POST /api/games/`
 * Test to see if Route validation works should return a `402` status code.
 * Tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.
 */

describe("POST /api/games/", () => {
  const game = {
    title: "The Legend of Zelda",
    genre: "Adventure",
    releaseYear: 2000
  };

  //Data is validated in request route which sends 402 Error Message
  it("should validate required information is provided", async () => {
    const data = await request(server)
      .post("/api/games")
      .send();
    expect(data.status).toBe(402);
  });

  //Sends status 201 upon creation of new game object
  it("should return the correct status code", async () => {
    const data = await request(server)
      .post("/api/games")
      .send(game);

    expect(data.status).toBe(201);
  });

  it("should return newly inserted object", async () => {
    const data = await request(server)
      .post("/api/games/")
      .send(game);
    expect(data.body[0]).toMatchObject(game);
  });
});

/**
 * Test `GET /games` endpoint should return the list of games and HTTP status code 200.
 * Test to make sure this endpoint always returns an array, even if there are no games stored.
 * If there are no games to return, the endpoint should return an empty array.
 */
describe("GET /api/games/", () => {
  it("should return a list of games and a status code of 200", async () => {
    const data = await request(server).get("/api/games/");
    const games = await pg.find();
    expect(data.body).toEqual(games);
  });

  it("should always return an array", async () => {
    const data = await request(server).get("/api/games/");
    if (data.length < 0) {
      expect(data.body).toStrictEqual([]);
    }
  });
});
