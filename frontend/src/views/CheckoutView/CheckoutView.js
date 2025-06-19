"use client";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import styles from "./CheckoutView.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

// CheckoutView - page for making an order from cart items
export default function CheckoutView() {
  // Get all cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Get user data from Redux store
  const user = useSelector((state) => state.user.user);

  // Get dispatch function to send Redux actions
  const dispatch = useDispatch();

  // Get router object for navigation
  const router = useRouter();

  // Address input for shipping
  const [address, setAddress] = useState("");

  // State for loading (during order submit)
  const [submitting, setSubmitting] = useState(false);

  // State for showing order success message
  const [orderSuccess, setOrderSuccess] = useState(false);

  // State for error message
  const [error, setError] = useState("");

  // Calculate total price for all items in cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If cart is empty, show message and link to shop
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        Cart is empty. <a href="/">Go shopping</a>
      </div>
    );
  }

  // If user not logged in, redirect to login page
  if (!user) {
    router.push("/login");
    return null;
  }

  // Function to handle order submission
  async function handleOrder(e) {
    e.preventDefault(); // Prevent default form submit
    setSubmitting(true);
    setError("");
    try {
      // Calculate prices
      const itemsPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingPrice = 0; // Static value for now
      const taxPrice = 0; // Static value for now
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Prepare order items for backend
      const orderItems = cartItems.map((item) => ({
        ...item,
        product: item.id, // For backend API
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

      // If order failed, show error
      if (!res.ok) throw new Error((await res.json()).error || "Order failed");

      // If success, show success message and clear cart
      setOrderSuccess(true);
      dispatch(clearCart());
    } catch (err) {
      // If error, show error message
      setError(err.message);
    }
    setSubmitting(false);
  }

  // If order was successful, show message
  if (orderSuccess)
    return (
      <div className={styles.success}>
        ✅ Order placed successfully!
        <br />
        <a href="/">Back to shop</a>
      </div>
    );

  // Main checkout view
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      {/* Show list of cart items */}
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
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
      {/* Order form */}
      <form className={styles.form} onSubmit={handleOrder}>
        {/* Show total price */}
        <div className={styles.total}>
          <strong>
            Total:{" "}
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </strong>
        </div>
        {/* Shipping address input */}
        <input
          type="text"
          placeholder="Shipping address"
          value={address}
          required
          className={styles.input}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* Order submit button */}
        <button className={styles.btn} disabled={submitting}>
          {submitting ? "Placing order..." : "Place order"}
        </button>
        {/* Show error if exists */}
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </section>
  );
}
