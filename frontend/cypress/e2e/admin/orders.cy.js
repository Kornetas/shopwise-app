describe("Admin – Orders view", () => {
  beforeEach(() => {
    // Log in as admin using the UI
    cy.visit("/login");
    cy.get('input[placeholder="Email"]').type("d@o2.pl");
    cy.get('input[placeholder="Password"]').type("d");
    cy.get("button")
      .contains(/log in/i)
      .click();

    // Go to the admin panel
    cy.contains(/admin panel/i).click();
    cy.url().should("include", "/admin");

    // Wait for the orders panel header
    cy.get('[data-cy="admin-orders-title"]').should("be.visible");
  });

  it("shows either orders list or empty message", () => {
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="admin-orders-list"]').length > 0) {
        cy.get('[data-cy="admin-orders-item"]').should(
          "have.length.greaterThan",
          0
        );
      } else {
        cy.get('[data-cy="admin-orders-empty"]').should("be.visible");
      }
    });
  });
});
