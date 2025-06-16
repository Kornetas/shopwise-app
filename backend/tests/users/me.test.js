const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../setupTestDB");

// Connect to in-memory MongoDB before tests
setupDB();

describe("GET /api/users/me", () => {
  // Dummy user data for registration/login
  const userData = {
    name: "Me Jest User",
    email: "mejest@example.com",
    password: "testpass789",
  };

  let agent;

  beforeAll(async () => {
    // Use agent to persist cookies across requests (important for JWT in httpOnly cookie)
    agent = request.agent(app);

    // Register the user
    await agent.post("/api/users/register").send(userData);

    // Then log in to receive the JWT cookie
    await agent.post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });
  });

  it("should return current user profile with valid JWT", async () => {
    // Make a request to /me with the logged-in agent (cookie included)
    const res = await agent.get("/api/users/me");

    // Expect successful response with user data (but no passwordHash)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", userData.email);
    expect(res.body).toHaveProperty("name", userData.name);
    expect(res.body).not.toHaveProperty("passwordHash");
  });

  it("should fail if not authenticated", async () => {
    // Use raw request (no cookies) – should be unauthorized
    const res = await request(app).get("/api/users/me");
    expect(res.statusCode).toBe(401); // or 403 depending on your auth logic
    expect(res.body).toHaveProperty("error");
  });
});
