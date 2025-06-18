"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../../features/cart/cartSlice";
import styles from "./CartView.module.css";
import Link from "next/link";

export default function CartView() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className={styles.empty}>Your cart is empty.</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <Link href={`/products/${item.id}`} className={styles.productName}>
              {item.name}
            </Link>
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
            <span className={styles.price}>
              {(item.price * item.quantity).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              €
            </span>
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
      <div className={styles.summary}>
        <span>
          <strong>Total:</strong>{" "}
          {total.toLocaleString("en-US", { minimumFractionDigits: 2 })} €
        </span>
        <button className={styles.clear} onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
      </div>
    </section>
  );
}
