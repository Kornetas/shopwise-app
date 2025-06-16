const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const User = require("../../models/User");
const Product = require("../../models/Product");

setupDB();

describe("Get all orders endpoint (admin only)", () => {
  let adminToken, userToken, orderId, testProduct;

  beforeEach(async () => {
    // Register and promote admin
    await request(app).post("/api/users/register").send({
      name: "Admin2",
      email: "admin2@example.com",
      password: "adminpass",
    });
    await User.updateOne({ email: "admin2@example.com" }, { role: "admin" });
    const adminRes = await request(app)
      .post("/api/users/login")
      .send({ email: "admin2@example.com", password: "adminpass" });
    adminToken = adminRes.headers["set-cookie"];

    // Register user
    await request(app).post("/api/users/register").send({
      name: "Regular",
      email: "regular@example.com",
      password: "regularpass",
    });
    const userRes = await request(app)
      .post("/api/users/login")
      .send({ email: "regular@example.com", password: "regularpass" });
    userToken = userRes.headers["set-cookie"];

    // Create product
    testProduct = await Product.create({
      name: "AdminOrderProduct",
      description: "Product for order admin test",
      price: 30,
      category: "cat",
      brand: "BrandAdmin",
      countInStock: 2,
    });

    // User makes an order
    const orderRes = await request(app)
      .post("/api/orders")
      .set("Cookie", userToken)
      .send({
        orderItems: [
          {
            product: testProduct._id,
            name: testProduct.name,
            qty: 1,
            price: testProduct.price,
            image: testProduct.image,
          },
        ],
        shippingAddress: {
          address: "789 Admin Ave",
          city: "Admintown",
          postalCode: "11-111",
          country: "Poland",
        },
        paymentMethod: "CreditCard",
        itemsPrice: 30,
        shippingPrice: 5,
        taxPrice: 0,
        totalPrice: 35,
      });

    orderId = orderRes.body._id;
  });

  it("should allow admin to get all orders", async () => {
    const res = await request(app).get("/api/orders").set("Cookie", adminToken);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.some((order) => order._id === orderId)).toBe(true);
  });

  it("should NOT allow regular user to get all orders", async () => {
    const res = await request(app).get("/api/orders").set("Cookie", userToken);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error");
  });

  it("should NOT allow unauthenticated request", async () => {
    const res = await request(app).get("/api/orders");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
