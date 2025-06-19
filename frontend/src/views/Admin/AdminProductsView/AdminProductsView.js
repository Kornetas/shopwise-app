"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./AdminProductsView.module.css";

// Admin panel: product management
export default function AdminProductsView() {
  const user = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Refresh after delete/add
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

  useEffect(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }
    fetchProducts();
  }, [user]);

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

  if (!user || user.role !== "admin")
    return <div className={styles.error}>Not authorized</div>;
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Product Management</h1>
      <Link href="/admin/products/new" className={styles.addBtn}>
        + Add new product
      </Link>
      <ul className={styles.list}>
        {products.map((p) => (
          <li key={p._id} className={styles.item}>
            <span className={styles.name}>{p.name}</span>
            <span className={styles.price}>
              {p.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <Link
              href={`/admin/products/${p._id}/edit`}
              className={styles.editBtn}
            >
              Edit
            </Link>
            <button
              className={styles.deleteBtn}
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
