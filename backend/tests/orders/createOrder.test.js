const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const Product = require("../../models/Product");

setupDB();

describe("Order creation endpoint", () => {
  let userToken;
  let testProduct;

  beforeEach(async () => {
    // Register and log in user to get auth cookie
    await request(app).post("/api/users/register").send({
      name: "Order User",
      email: "orderuser@example.com",
      password: "user123",
    });

    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "orderuser@example.com", password: "user123" });

    userToken = res.headers["set-cookie"];

    // Create a product to be included in the order
    testProduct = await Product.create({
      name: "Order Test Product",
      description: "For order test",
      price: 25,
      category: "testcat",
      brand: "OrderBrand",
      countInStock: 8,
    });
  });

  it("should allow logged-in user to place an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Cookie", userToken)
      .send({
        orderItems: [
          {
            product: testProduct._id,
            name: testProduct.name,
            qty: 2,
            price: testProduct.price,
            image: testProduct.image,
          },
        ],
        shippingAddress: {
          address: "123 Test St",
          city: "Testville",
          postalCode: "00-123",
          country: "Poland",
        },
        paymentMethod: "PayPal",
        itemsPrice: 50,
        shippingPrice: 10,
        taxPrice: 5,
        totalPrice: 65,
      });

    // Expect successful creation
    expect(res.statusCode).toBe(201);
    // Order should include user ID and product details
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("orderItems");
    expect(res.body.orderItems[0]).toHaveProperty(
      "product",
      testProduct._id.toString()
    );
  });

  it("should NOT allow placing order without being logged in", async () => {
    const res = await request(app)
      .post("/api/orders")
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
          address: "456 Nowhere",
          city: "Unknown",
          postalCode: "99-999",
          country: "Nowhere",
        },
        paymentMethod: "PayPal",
        itemsPrice: 25,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 25,
      });

    // Expect auth error
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should NOT allow empty order (no order items)", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Cookie", userToken)
      .send({
        orderItems: [], // <- No items
        shippingAddress: {
          address: "789 Test Ave",
          city: "Nocity",
          postalCode: "88-888",
          country: "Noland",
        },
        paymentMethod: "PayPal",
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      });

    // Expect validation error
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
