const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const Product = require("../../models/Product");

setupDB();

describe("Get my orders endpoint", () => {
  let userToken;
  let orderId;
  let testProduct;

  beforeEach(async () => {
    // Register and log in user
    await request(app).post("/api/users/register").send({
      name: "Orders User",
      email: "ordersuser@example.com",
      password: "user123",
    });
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "ordersuser@example.com", password: "user123" });
    userToken = res.headers["set-cookie"];

    // Create product
    testProduct = await Product.create({
      name: "User Order Product",
      description: "Order product",
      price: 60,
      category: "orders",
      brand: "OrderBrand",
      countInStock: 3,
    });

    // Place an order
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
          address: "456 Order St",
          city: "Ordercity",
          postalCode: "12-345",
          country: "Poland",
        },
        paymentMethod: "PayPal",
        itemsPrice: 60,
        shippingPrice: 10,
        taxPrice: 0,
        totalPrice: 70,
      });

    orderId = orderRes.body._id;
  });

  it("should return all orders for logged-in user", async () => {
    const res = await request(app)
      .get("/api/orders/my")
      .set("Cookie", userToken);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.some((order) => order._id === orderId)).toBe(true);
  });

  it("should NOT allow getting orders without logging in", async () => {
    const res = await request(app).get("/api/orders/myorders");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
