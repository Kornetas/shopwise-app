"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import styles from "./AddToCartButton.module.css";

// Button for adding product to cart (uses redux)
export default function AddToCartButton({ product }) {
  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // When user clicks the button, add product to cart
  function handleAdd() {
    // Send action to Redux: add this product to the cart
    // Dispatch addToCart with product id, name, price (I will build it up later)
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
      })
    );
    // Optionally: I can show a toast here ("Added to cart!")
    // alert("Added to cart!"); // Placeholder UX
  }

  return (
    <button className={styles.btn} onClick={handleAdd}>
      Add to cart
    </button>
  );
}
