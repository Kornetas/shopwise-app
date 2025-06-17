"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import styles from "./AddToCartButton.module.css";

// Simple add to cart button – dispatches to redux store
export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  function handleAdd() {
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
