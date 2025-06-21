describe("User registration", () => {
  it("allows a new user to register", () => {
    // Go to the registration page
    cy.visit("/register");

    // Fill out the registration form with a unique user
    cy.get('[data-cy="register-name"]').type("Test User");
    cy.get('[data-cy="register-email"]').type(`test${Date.now()}@test.com`);
    cy.get('[data-cy="register-password"]').type("SuperSecret123");

    // Submit the registration form
    cy.get('[data-cy="register-btn"]').click();

    // Check if the welcome message is visible after successful registration
    cy.get('[data-cy="register-success-msg"]').should("be.visible");
  });
});
