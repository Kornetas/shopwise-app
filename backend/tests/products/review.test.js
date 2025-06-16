const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const Product = require("../../models/Product");

setupDB();

describe("Product review endpoint", () => {
  let userToken;
  let testProduct;

  beforeEach(async () => {
    // Register user
    await request(app).post("/api/users/register").send({
      name: "Review User",
      email: "reviewuser@example.com",
      password: "user123",
    });

    // Login user to get token/cookie
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "reviewuser@example.com", password: "user123" });
    userToken = res.headers["set-cookie"];

    // Create product to review
    testProduct = await Product.create({
      name: "Product for Review",
      description: "Test review product",
      price: 55,
      category: "test",
      brand: "BrandZ",
      countInStock: 7,
    });
  });

  it("should allow a logged-in user to add a review", async () => {
    const res = await request(app)
      .post(`/api/products/${testProduct._id}/reviews`)
      .set("Cookie", userToken)
      .send({
        rating: 5,
        comment: "This rocks!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Review added!");
  });

  it("should NOT allow user to review the same product twice", async () => {
    // First review
    await request(app)
      .post(`/api/products/${testProduct._id}/reviews`)
      .set("Cookie", userToken)
      .send({ rating: 4, comment: "Nice one." });

    // Second review – should fail
    const res = await request(app)
      .post(`/api/products/${testProduct._id}/reviews`)
      .set("Cookie", userToken)
      .send({ rating: 3, comment: "Trying again" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should NOT allow review without being logged in", async () => {
    const res = await request(app)
      .post(`/api/products/${testProduct._id}/reviews`)
      .send({ rating: 5, comment: "Hacker mode" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should NOT allow invalid rating", async () => {
    const res = await request(app)
      .post(`/api/products/${testProduct._id}/reviews`)
      .set("Cookie", userToken)
      .send({ rating: 9, comment: "Too high!" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
