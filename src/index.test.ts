import request from "supertest";
import {app} from "./app";

let token = '';

beforeAll(async () => {
  const res = await request(app).post("/api/v1/user").send({
    userName: "Esteban Quito",
    password: "test123"
  });
  token = res.body.accessToken;
});

describe("GET /api/v1/dictionary/best-results", () => {
  it("should return the best results based on the words discovered and less attemnts", async () => {
    const res = await request(app).get("/api/v1/dictionary/best-results");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/v1/user/best-players", () => {
  it("should return the top 10 players with more victories", async () => {
    const res = await request(app).get("/api/v1/user/best-players");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/v1/user", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/api/v1/user").send({
      userName: "Esteban Quito",
      password: "test123"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("ESTEBAN QUITO");
  });
});

describe("GET /api/v1/dictionary", () => {
  it("should generate a word and increment the number of games of the user", async () => {
    const res = await request(app).get("/api/v1/dictionary/").set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Palabra generada correctamente');
  });
});
