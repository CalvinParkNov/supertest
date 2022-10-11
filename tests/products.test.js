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
  it("모든 제품들 불러오기", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/products", () => {
  it("제품 입력하기", async () => {
    const res = await request(app).post("/api/products").send({
      name: "iPhone 14 pro",
      price: 2000,
      description: "iPhone 14 pro from Apple",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("iPhone 14 pro");
  });
});
