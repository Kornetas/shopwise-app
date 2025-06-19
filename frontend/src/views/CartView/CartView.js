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

// Component to display and manage shopping cart
export default function CartView() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  // Get all items in the cart from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Get dispatch function to send actions to Redux
  const dispatch = useDispatch();

  // Calculate total price of all items in cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return <div className={styles.empty}>Your cart is empty.</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
            {/* Link to product details page */}
            <Link href={`/products/${item.id}`} className={styles.productName}>
              {item.name}
            </Link>
            {/* Quantity controls */}
            <div className={styles.qtyBox}>
              <button
                className={styles.qtyBtn}
                onClick={() => dispatch(decrementQty(item.id))}
                disabled={item.quantity === 1}
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className={styles.qty}>{item.quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => dispatch(incrementQty(item.id))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            {/* Show price for this item */}
            <span className={styles.price}>
              {(item.price * item.quantity).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              €
            </span>
            {/* Remove button */}
            <button
              className={styles.remove}
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label="Remove from cart"
              title="Remove"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      {/* Cart summary: total price and clear cart */}
      <div className={styles.summary}>
        <span>
          <strong>Total:</strong>{" "}
          {total.toLocaleString("en-US", { minimumFractionDigits: 2 })} €
        </span>
        <button
          className={styles.checkout}
          onClick={() => router.push(user ? "/checkout" : "/login")}
        >
          Checkout
        </button>
        <button className={styles.clear} onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
      </div>
    </section>
  );
}
