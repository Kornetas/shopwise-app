"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AdminOrdersView.module.css";
import Link from "next/link";

// Admin panel: show all orders in system (only for admin user)
export default function AdminOrdersView() {
  // Get current user from Redux store
  const user = useSelector((state) => state.user.user);

  // Local state for orders, loading, error
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // On mount: check if user is admin, fetch all orders
  useEffect(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }
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

  // Not authorized screen for non-admins
  if (!user || user.role !== "admin")
    return (
      <div className={styles.error} data-cy="admin-orders-error">
        Not authorized. Only admin can access this page.
      </div>
    );
  if (loading)
    return (
      <div className={styles.loading} data-cy="admin-orders-loading">
        Loading all orders...
      </div>
    );
  if (error)
    return (
      <div className={styles.error} data-cy="admin-orders-error">
        {error}
      </div>
    );

  return (
    <section className={styles.container}>
      <h1 className={styles.title} data-cy="admin-orders-title">
        Admin – All Orders
      </h1>
      {orders.length === 0 ? (
        <div className={styles.empty} data-cy="admin-orders-empty">
          No orders found.
        </div>
      ) : (
        <ul className={styles.list} data-cy="admin-orders-list">
          {orders.map((order) => (
            <li
              key={order._id}
              className={styles.item}
              data-cy="admin-orders-item"
            >
              <div>
                <span className={styles.orderId} data-cy="admin-order-id">
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
                  data-cy="admin-order-details-link"
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
      )}
    </section>
  );
}
