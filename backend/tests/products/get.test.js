const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");
const Product = require("../../models/Product");

setupDB();

describe("Product endpoints get all & get by id", () => {
  let testProduct;

  beforeEach(async () => {
    // Create a product for testing
    testProduct = await Product.create({
      name: "Test Product",
      description: "Some description",
      price: 123,
      category: "phone",
      brand: "TestBrand",
      image: "test.jpg",
      countInStock: 5,
    });
  });

  it("should get all products", async () => {
    // Anyone can see all products – even without login
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Should contain at least our test product
    expect(res.body.some((prod) => prod.name === "Test Product")).toBe(true);
  });

  it("should get product details by id", async () => {
    const res = await request(app).get(`/api/products/${testProduct._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", testProduct.name);
    expect(res.body).toHaveProperty("price", testProduct.price);
  });

  it("should return 404 for non-existing product", async () => {
    // Random ObjectId
    const res = await request(app).get(
      "/api/products/123456789012345678901234"
    );
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
