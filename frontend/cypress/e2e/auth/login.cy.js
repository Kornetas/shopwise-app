describe("Login process", () => {
  it("logs in the user and shows success message", () => {
    // Visit the login page
    cy.visit("/login");

    // Fill in login form
    cy.get('input[placeholder="Email"]').type("a@o2.pl");
    cy.get('input[placeholder="Password"]').type("a");

    // Submit the form
    cy.get("button")
      .contains(/log in/i)
      .click();

    // Assert the success message is shown after login
    cy.get('[data-cy="login-success-msg"]', { timeout: 8000 })
      .should("be.visible")
      .and("contain", "Logged in as");
  });
});
