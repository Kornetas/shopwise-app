describe("Checkout process", () => {
  it("allows to checkout as logged in user", () => {
    // Go to login page and log in
    cy.visit("/login");
    cy.get('[data-cy="login-email"]').type("a@o2.pl");
    cy.get('[data-cy="login-password"]').type("a");
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="login-success-msg"]', { timeout: 8000 }).should(
      "be.visible"
    );

    // Go to homepage and open product
    cy.visit("/");
    cy.contains("Samsung Galaxy S24 Ultra").click();
    cy.url().should("include", "/products/");

    // Add to cart
    cy.contains("button", /add to cart/i).click();

    // Go to cart (navbar button/link)
    cy.get('[data-cy="cart-link"]').click();

    // Proceed to checkout
    cy.contains(/checkout/i).click();

    // Fill checkout form and place order
    cy.get('[data-cy="checkout-address-input"]').type("jacekkowalski");
    cy.get('[data-cy="checkout-place-order-btn"]').click();

    // Check for "Cart is empty" and "Go shopping" after order
    cy.contains("Cart is empty.").should("be.visible");
    cy.contains("Go shopping").should("be.visible");

    // Optionally: click "Go shopping" and verify redirection to /
    cy.contains("Go shopping").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
