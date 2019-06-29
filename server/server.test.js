const server = require("./server");
const request = require("supertest");

describe("GET /", () => {
  it("sever should be up and running", done => {
    request(server)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
