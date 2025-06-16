const request = require("supertest");
const app = require("../../server");
const User = require("../../models/User");
const { setupDB } = require("../setupTestDB");

// Connect to in-memory MongoDB before tests
setupDB();

describe("User login endpoint", () => {
  const userData = {
    name: "Login Jest User",
    email: "loginjest@example.com",
    password: "testpass456",
  };

  // Create user before running login tests
  beforeAll(async () => {
    await request(app).post("/api/users/register").send(userData);
  });

  it("should log in user with correct credentials and set JWT cookie", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    // Expect successful login
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", userData.email);

    // Check if JWT token cookie is set
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies.some((cookie) => cookie.includes("token"))).toBe(true);
  });

  it("should fail to log in with wrong password", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: "wrongpass",
    });

    // Expect 401 error for invalid credentials
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should fail to log in with non-existent email", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "notfound@example.com",
      password: "whatever",
    });

    // Expect 401 error for unknown user
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
