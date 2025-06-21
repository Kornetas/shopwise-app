"use client";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import styles from "./CheckoutView.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Checkout page for placing an order from cart items
export default function CheckoutView() {
  // Get all items from the cart (Redux state)
  const cartItems = useSelector((state) => state.cart.items);
  // Get the logged in user (Redux state)
  const user = useSelector((state) => state.user.user);
  // Redux dispatch function
  const dispatch = useDispatch();
  // Router for navigation
  const router = useRouter();

  // State for shipping address input
  const [address, setAddress] = useState("");
  // State for loading indicator
  const [submitting, setSubmitting] = useState(false);
  // State to show order success message
  const [orderSuccess, setOrderSuccess] = useState(false);
  // State to show any error
  const [error, setError] = useState("");

  // Calculate the total order price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If cart is empty, show a message and a link to go shopping
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty} data-cy="checkout-cart-empty">
        Cart is empty.{" "}
        <a href="/" data-cy="checkout-go-shopping">
          Go shopping
        </a>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    router.push("/login");
    return null;
  }

  // Handle order submission
  async function handleOrder(e) {
    e.preventDefault(); // Prevent page reload
    setSubmitting(true);
    setError("");
    try {
      // Prepare order items and prices
      const itemsPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingPrice = 0;
      const taxPrice = 0;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      const orderItems = cartItems.map((item) => ({
        ...item,
        product: item.id,
      }));

      // Send order to backend API
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            orderItems,
            shippingAddress: address,
            paymentMethod: "Cash",
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          }),
        }
      );
      if (!res.ok) throw new Error((await res.json()).error || "Order failed");
      // On success: show message and clear cart
      setOrderSuccess(true);
      dispatch(clearCart());
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  }

  // Show order success message and link to the shop
  if (orderSuccess)
    return (
      <div className={styles.success} data-cy="checkout-success-msg">
        {/* Success message after order placed */}
        ✅ Order placed successfully!
        <br />
        <a href="/" data-cy="checkout-back-to-shop">
          Back to shop
        </a>
      </div>
    );

  // Main checkout view
  return (
    <section className={styles.container}>
      {/* Checkout title */}
      <h1 className={styles.title} data-cy="checkout-title">
        Checkout
      </h1>
      {/* List all items in the cart */}
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className={styles.item}
            data-cy="checkout-cart-item"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              {(item.price * item.quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          </li>
        ))}
      </ul>
      {/* Checkout form */}
      <form className={styles.form} onSubmit={handleOrder}>
        {/* Total price */}
        <div className={styles.total} data-cy="checkout-total">
          <strong>
            Total:{" "}
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </strong>
        </div>
        {/* Shipping address input with data-cy */}
        <input
          type="text"
          placeholder="Shipping address"
          value={address}
          required
          className={styles.input}
          onChange={(e) => setAddress(e.target.value)}
          data-cy="checkout-address-input"
        />
        {/* Place order button with data-cy */}
        <button
          className={styles.btn}
          disabled={submitting}
          data-cy="checkout-place-order-btn"
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
        {/* Show error if exists */}
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </section>
  );
}
