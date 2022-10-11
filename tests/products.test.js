const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/*test를 진행할때마다 데이터베이스에 connect한다.*/
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/*test가 끝나면 데이터베이스에 disconnect을 한다.*/
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
