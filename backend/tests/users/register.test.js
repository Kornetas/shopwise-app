const request = require("supertest");
const app = require("../../server");
const User = require("../../models/User");
const { setupDB } = require("../setupTestDB");

setupDB(); // Boot the in-memory DB before tests

describe("User registration", () => {
  it("should register a new user and return user data", async () => {
    const userData = {
      name: "Register Jest User",
      email: "jestuser@example.com",
      password: "testpass123",
    };

    // Send POST request to /api/users/register with user data
    const res = await request(app).post("/api/users/register").send(userData);

    // Expect successful response
    expect(res.statusCode).toBe(201);

    // Response should include correct email and name
    expect(res.body).toHaveProperty("email", userData.email);
    expect(res.body).toHaveProperty("name", userData.name);

    // Should NOT return passwordHash for security reasons
    expect(res.body).not.toHaveProperty("passwordHash");
  });

  it("should not register user with missing fields", async () => {
    // Send bad/incomplete data (missing required fields)
    const res = await request(app)
      .post("/api/users/register")
      .send({ email: "", password: "" });

    // Should return 400 Bad Request
    expect(res.statusCode).toBe(400);

    // Error message expected
    expect(res.body).toHaveProperty("error");
  });

  it("should not register user with duplicate email", async () => {
    const userData = {
      name: "Duplicate Jest User",
      email: "duplicateuser@example.com",
      password: "dup1234",
    };

    // First registration should succeed
    await request(app).post("/api/users/register").send(userData);

    // Second registration with same email should fail
    const res = await request(app).post("/api/users/register").send(userData);

    // Should return 409 Conflict
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("error");
  });
});
