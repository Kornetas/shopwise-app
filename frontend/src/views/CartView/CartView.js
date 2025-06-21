"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../../features/cart/cartSlice";
import styles from "./CartView.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Component for displaying and managing the shopping cart
export default function CartView() {
  const router = useRouter();
  // Get current user from Redux state (to check if user is logged in)
  const user = useSelector((state) => state.user.user);

  // Get all cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  // Get the dispatch function for Redux actions
  const dispatch = useDispatch();

  // Calculate the total price of all products in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If the cart is empty, show a message to the user
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty} data-cy="cart-empty-msg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {/* Cart title */}
      <h1 className={styles.title} data-cy="cart-title">
        Your Cart
      </h1>

      {/* List of products in the cart */}
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item} data-cy="cart-item">
            {/* Product name with link to the product details page */}
            <Link href={`/products/${item.id}`} className={styles.productName}>
              {item.name}
            </Link>

            {/* Quantity controls */}
            <div className={styles.qtyBox}>
              {/* Button to decrease quantity */}
              <button
                className={styles.qtyBtn}
                onClick={() => dispatch(decrementQty(item.id))}
                disabled={item.quantity === 1}
                aria-label="Decrease quantity"
                data-cy="cart-qty-decrease"
              >
                –
              </button>
              {/* Display current quantity */}
              <span className={styles.qty} data-cy="cart-qty">
                {item.quantity}
              </span>
              {/* Button to increase quantity */}
              <button
                className={styles.qtyBtn}
                onClick={() => dispatch(incrementQty(item.id))}
                aria-label="Increase quantity"
                data-cy="cart-qty-increase"
              >
                +
              </button>
            </div>
            {/* Show total price for this cart item */}
            <span className={styles.price} data-cy="cart-item-price">
              {(item.price * item.quantity).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              €
            </span>
            {/* Button to remove the product from the cart */}
            <button
              className={styles.remove}
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label="Remove from cart"
              title="Remove"
              data-cy="cart-remove-item"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      {/* Cart summary with total price and action buttons */}
      <div className={styles.summary}>
        {/* Total price of all items */}
        <span data-cy="cart-total">
          <strong>Total:</strong>{" "}
          {total.toLocaleString("en-US", { minimumFractionDigits: 2 })} €
        </span>
        {/* Button to proceed to checkout (requires login) */}
        <button
          className={styles.checkout}
          onClick={() => router.push(user ? "/checkout" : "/login")}
          data-cy="checkout-btn"
        >
          Checkout
        </button>
        {/* Button to clear the cart */}
        <button
          className={styles.clear}
          onClick={() => dispatch(clearCart())}
          data-cy="clear-cart-btn"
        >
          Clear cart
        </button>
      </div>
    </section>
  );
}
