"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AdminOrdersView.module.css";
import Link from "next/link";

// Admin panel: show all orders in system (only for admin user)
export default function AdminOrdersView() {
  // Get user from redux to check if admin
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== "admin") {
      window.location.href = "/"; // or show "Not authorized"
      return;
    }
    // Fetch all orders (admin endpoint)
    async function fetchOrders() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/orders`,
          { credentials: "include" }
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
  }, [user]);

  if (!user || user.role !== "admin")
    return (
      <div className={styles.error}>
        Not authorized. Only admin can access this page.
      </div>
    );
  if (loading)
    return <div className={styles.loading}>Loading all orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Admin – All Orders</h1>
      <ul className={styles.list}>
        {orders.map((order) => (
          <li key={order._id} className={styles.item}>
            <div>
              <span className={styles.orderId}>
                Order: <b>{order._id.slice(-6).toUpperCase()}</b>
              </span>
              <span className={styles.date}>
                {new Date(order.createdAt).toLocaleString("en-GB")}
              </span>
            </div>
            <div>
              <span className={styles.count}>
                {order.orderItems.length} item(s)
              </span>
              <span className={styles.total}>
                Total:{" "}
                {order.totalPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
              <Link
                href={`/orders/${order._id}`}
                className={styles.detailsLink}
              >
                Details
              </Link>
            </div>
            <div className={styles.userInfo}>
              User: {order.user?.name || "unknown"} (
              {order.user?.email || order.user || "id"})
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
