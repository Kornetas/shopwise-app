describe("Cart actions", () => {
  it("adds a product to cart", () => {
    // Visit the main page
    cy.visit("/");

    // Click on the product tile by name (make sure the name is unique)
    cy.contains("Samsung Galaxy S24 Ultra").click();

    // Check if the URL is the product details page
    cy.url().should("include", "/products/");

    // Click the "Add to cart" button
    cy.contains("button", /add to cart/i).click();

    // Go to the cart page (find by link or use navbar)
    cy.get('[data-cy="cart-link"]').click(); // lub kliknij w navbar, jeśli masz data-cy na linku

    // Make sure the cart is displayed
    cy.contains(/your cart/i).should("be.visible");

    // Check that at least one product is in the cart
    cy.get('[data-cy="cart-item"]').should("have.length.greaterThan", 0);
  });
});
