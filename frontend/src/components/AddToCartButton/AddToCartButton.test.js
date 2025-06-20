import { renderWithStore } from "../../test-utils/renderWithStore";
import { screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "./AddToCartButton";

// Mock product data for testing
const mockProduct = {
  _id: "test123",
  name: "Super Gadget",
  price: 199.99,
};

describe("AddToCartButton", () => {
  // This test checks if clicking the button adds the product to the cart
  it("dispatches addToCart when clicked", () => {
    // Render button with test Redux store
    const { store } = renderWithStore(
      <AddToCartButton product={mockProduct} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button); // Simulate user clicking

    // Check if product is added to the Redux cart state
    const state = store.getState();
    expect(state.cart.items[0]).toMatchObject({
      name: "Super Gadget",
      price: 199.99,
    });
  });

  // This test checks if the button shows the correct text
  it("displays correct button text", () => {
    renderWithStore(<AddToCartButton product={mockProduct} />);
    expect(screen.getByRole("button")).toHaveTextContent(/add to cart/i);
  });
});
