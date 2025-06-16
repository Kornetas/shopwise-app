const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const User = require("../../models/User");

setupDB();

describe("Product creation endpoint", () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    // Register admin user
    await request(app).post("/api/users/register").send({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
    });

    // Promote to admin in DB
    await User.updateOne({ email: "admin@example.com" }, { role: "admin" });

    // Login as admin
    const adminRes = await request(app)
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "admin123" });
    adminToken = adminRes.headers["set-cookie"];

    // Register regular user
    await request(app).post("/api/users/register").send({
      name: "User",
      email: "user@example.com",
      password: "user123",
    });

    // Login as user
    const userRes = await request(app)
      .post("/api/users/login")
      .send({ email: "user@example.com", password: "user123" });
    userToken = userRes.headers["set-cookie"];
  });

  it("should allow admin to create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Cookie", adminToken)
      .send({
        name: "Admin Product",
        description: "Cool stuff",
        price: 100,
        category: "gadget",
        brand: "BrandX",
        image: "test.jpg",
        countInStock: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Admin Product");
  });

  it("should NOT allow regular user to create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Cookie", userToken)
      .send({
        name: "User Product",
        description: "Should be blocked",
        price: 50,
        category: "misc",
        brand: "BrandY",
        image: "user.jpg",
        countInStock: 3,
      });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
});
