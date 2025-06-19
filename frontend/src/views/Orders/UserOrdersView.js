"use client";
import { useEffect, useState } from "react";
import styles from "./UserOrdersView.module.css";

// My Orders view for logged-in users
export default function UserOrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user orders on mount
    async function fetchOrders() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/orders/my`,
          { credentials: "include" } // for httpOnly cookies auth
        );
        if (!res.ok)
          throw new Error((await res.json()).error || "Could not fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (orders.length === 0) {
    return <div className={styles.empty}>You have no orders yet.</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      <ul className={styles.list}>
        {orders.map((order) => (
          <li key={order._id} className={styles.item}>
            <div>
              <span className={styles.orderId}>
                Order ID: <b>{order._id.slice(-6).toUpperCase()}</b>
              </span>
              <span className={styles.date}>
                {new Date(order.createdAt).toLocaleString("en-GB")}
              </span>
            </div>
            <div>
              <span className={styles.count}>
                {order.orderItems.reduce((sum, it) => sum + it.quantity, 0)}{" "}
                item(s)
              </span>
              <span className={styles.total}>
                Total:{" "}
                {order.totalPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </div>
            {/* Quick details: show list of products */}
            <ul className={styles.itemsList}>
              {order.orderItems.map((item) => (
                <li key={item.product} className={styles.product}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
