import { render, screen } from "@testing-library/react";
import ProductsList from "./ProductsList";

// Test suite for ProductsList component
describe("ProductsList", () => {
  // This test checks if product names are shown on the screen
  it("shows product names", () => {
    // Example product data for testing
    const products = [
      { _id: "1", name: "Test Product", price: 100 },
      { _id: "2", name: "Another Product", price: 200 },
    ];

    // Render the component with sample products
    render(<ProductsList products={products} />);

    // Assert that both product names are visible
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Product/i)).toBeInTheDocument();
  });
});
