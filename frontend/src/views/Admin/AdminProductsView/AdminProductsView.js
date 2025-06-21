"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./AdminProductsView.module.css";

// Admin panel: product management (for admin user only)
export default function AdminProductsView() {
  const user = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch product list from backend
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/products`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error((await res.json()).error || "Fetch error");
      setProducts(await res.json());
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  // Load products on mount or when user changes
  useEffect(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }
    fetchProducts();
  }, [user]);

  // Delete product handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/products/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error((await res.json()).error || "Delete error");
      fetchProducts();
    } catch (e) {
      setError(e.message);
    }
  };

  // Block non-admins
  if (!user || user.role !== "admin")
    return <div className={styles.error}>Not authorized</div>;
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title} data-cy="admin-products-title">
        Product Management
      </h1>
      {/* Add new product button/link */}
      <Link
        href="/admin/products/new"
        className={styles.addBtn}
        data-cy="admin-add-product-btn"
      >
        + Add new product
      </Link>
      {/* Product list */}
      <ul className={styles.list} data-cy="admin-products-list">
        {products.map((p) => (
          <li key={p._id} className={styles.item} data-cy="admin-products-item">
            <span className={styles.name} data-cy="admin-product-name">
              {p.name}
            </span>
            <span className={styles.price}>
              {p.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <Link
              href={`/admin/products/${p._id}/edit`}
              className={styles.editBtn}
              data-cy="admin-product-edit-btn"
            >
              Edit
            </Link>
            <button
              className={styles.deleteBtn}
              data-cy="admin-product-delete-btn"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
