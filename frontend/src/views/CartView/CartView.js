"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../features/cart/cartSlice";
import styles from "./CartView.module.css";

export default function CartView() {
  // Get items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return <div className={styles.empty}>Your cart is empty.</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <span>
              <strong>{item.name}</strong> – {item.price} zł
            </span>
            <button
              className={styles.remove}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.summary}>
        <span>
          <strong>Total:</strong> {total} zł
        </span>
        <button className={styles.clear} onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
        {/* Checkout button can go here */}
      </div>
    </section>
  );
}
