describe("Admin – Manage products", () => {
  beforeEach(() => {
    // Log in as admin user via UI
    cy.visit("/login");
    cy.get('input[placeholder="Email"]').type("d@o2.pl");
    cy.get('input[placeholder="Password"]').type("d");
    cy.get("button")
      .contains(/log in/i)
      .click();

    // Go to the admin products panel
    cy.contains(/all products/i).click();
    cy.url().should("include", "/admin/products");
  });

  it("shows the list of products", () => {
    // Check that the "All Products" heading is visible
    cy.contains(/all products/i).should("be.visible");

    // Assert that the product list exists
    cy.get('[data-cy="admin-products-list"]').should("exist");

    // Assert there is at least one product in the list
    cy.get('[data-cy="admin-products-item"]').should(
      "have.length.greaterThan",
      0
    );
  });

  it("allows admin to add a new product", () => {
    // Click the "Add new product" button/link
    cy.get('[data-cy="admin-add-product-btn"]').click();

    // Fill in the product creation form (use your own data-cy or name attributes!)
    cy.get('input[name="name"]').type("E2E Product");
    cy.get('input[name="brand"]').type("TestBrand");
    cy.get('input[name="price"]').type("122");
    cy.get('input[name="category"]').type("asd");
    cy.get('input[name="countInStock"]').type("5");
    cy.get('textarea[name="description"]').type(
      "Some description for e2e test."
    );

    // Submit the new product
    cy.get("button")
      .contains(/save|add/i)
      .click();

    // Check that the new product appears in the product list
    cy.get('[data-cy="admin-product-name"]')
      .contains(/e2e product/i)
      .should("exist");

    // Check that another product (example: Sony) is in the list too
    cy.get('[data-cy="admin-product-name"]')
      .contains(/Sony WH-1000XM5/i)
      .should("exist");
  });

  it("allows admin to delete a product", () => {
    // Unique product name for this test run
    const productName = `E2E Product ${Date.now()}`;

    // Add a product to delete
    cy.get('[data-cy="admin-add-product-btn"]').click();
    cy.get('input[name="name"]').type(productName);
    cy.get('input[name="brand"]').type("TestBrand");
    cy.get('input[name="price"]').type("122");
    cy.get('input[name="category"]').type("asd");
    cy.get('input[name="countInStock"]').type("5");
    cy.get('textarea[name="description"]').type(
      "Some description for e2e test."
    );
    cy.get("button")
      .contains(/save|add/i)
      .click();

    // Check that the product is now visible in the list
    cy.get('[data-cy="admin-product-name"]')
      .contains(productName)
      .should("exist");

    // Handle confirm dialog (Cypress will accept automatically)
    cy.on("window:confirm", (text) => {
      expect(text).to.equal("Are you sure you want to delete this product?");
      return true;
    });

    // Find the product in the list and click its delete button
    cy.get('[data-cy="admin-products-item"]')
      .contains(productName)
      .parent()
      .within(() => {
        cy.get('[data-cy="admin-product-delete-btn"]').click();
      });

    // Assert that the product no longer exists in the list
    cy.get('[data-cy="admin-products-list"]')
      .contains(productName)
      .should("not.exist");
  });
});
