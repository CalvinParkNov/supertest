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
  it("제품 1개 생성하기", async () => {
    const res = await request(app).post("/api/products").send({
      name: "iPhone 14 pro MAX testing",
      price: 1009,
      description: "iPhone 14 pro max from apple",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.description).toBe("iPhone 14 pro max from apple");
  });
});

describe("GET /api/products/:id", () => {
  it(":id에 해당되는 제품 1개만 불러오기", async () => {
    const res = await request(app).get(
      "/api/products/63458bd2a51b00c023afb467"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("iPhone14 pro MAX");
  });
});

describe("PATCH /api/products/:id", () => {
  it(":id에 해당되는 제품 update하기", async () => {
    const res = await request(app)
      .patch("/api/products/63459064aa00232faac01cea")
      .send({
        name: "iPhone 14 pro MAX testing to iPhone 15 pro",
        price: 2000,
        description: "updated from iPhone 14 pro max to iPhone 15 pro",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(2000);
  });
});

describe("DELETE /api/products/:id", () => {
  it(":id에 해당하는 제품을 삭제하기", async () => {
    const res = await request(app).delete(
      "/api/products/634594fe7bc074d93b20e7c5"
    );
    expect(res.statusCode).toBe(200);
  });
});
