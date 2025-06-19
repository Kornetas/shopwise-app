"use client";
import { useEffect, useState } from "react";
import styles from "./OrderDetailsView.module.css";

// Order details view for a single order
export default function OrderDetailsView({ orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch order details when component mounts
    async function fetchOrder() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/orders/${orderId}`,
          { credentials: "include" }
        );
        if (!res.ok)
          throw new Error((await res.json()).error || "Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className={styles.loading}>Loading order...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!order) return null;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Order Details</h1>
      <div className={styles.meta}>
        <span className={styles.label}>Order ID:</span>
        <span className={styles.value}>{order._id}</span>
        <span className={styles.label}>Created:</span>
        <span className={styles.value}>
          {new Date(order.createdAt).toLocaleString("en-GB")}
        </span>
      </div>
      <div className={styles.address}>
        <strong>Shipping address:</strong> {order.shippingAddress}
      </div>
      <ul className={styles.itemsList}>
        {order.orderItems.map((item) => (
          <li key={item.product} className={styles.item}>
            <span className={styles.product}>
              {item.name} × {item.quantity}
            </span>
            <span className={styles.price}>
              {(item.price * item.quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.totals}>
        <div>
          <span className={styles.label}>Items:</span>
          <span className={styles.value}>
            {order.itemsPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </div>
        <div>
          <span className={styles.label}>Shipping:</span>
          <span className={styles.value}>
            {order.shippingPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </div>
        <div>
          <span className={styles.label}>Tax:</span>
          <span className={styles.value}>
            {order.taxPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </div>
        <div className={styles.totalRow}>
          <span className={styles.label}>Total:</span>
          <span className={styles.value} style={{ fontWeight: 700 }}>
            {order.totalPrice?.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </div>
      </div>
    </section>
  );
}
