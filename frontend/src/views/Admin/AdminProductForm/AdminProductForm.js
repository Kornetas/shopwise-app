"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminProductForm.module.css";

// ProductForm for create or edit product (admin only)
export default function ProductForm({ mode = "add", productId }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
    countInStock: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(mode === "edit");
  const router = useRouter();

  // If edit mode, fetch product data
  useEffect(() => {
    if (mode === "edit" && productId) {
      async function fetchProduct() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            }/products/${productId}`,
            { credentials: "include" }
          );
          if (!res.ok) throw new Error("Failed to fetch product");
          const data = await res.json();
          setProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            brand: data.brand,
            image: data.image,
            countInStock: data.countInStock,
          });
        } catch (err) {
          setError(err.message);
        }
        setLoading(false);
      }
      fetchProduct();
    }
  }, [mode, productId]);

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  // Submit form (add or edit)
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      // Simple validation
      if (!product.name || !product.price) {
        setError("Name and price are required");
        return;
      }
      const url =
        mode === "add"
          ? `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            }/products`
          : `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            }/products/${productId}`;
      const method = mode === "add" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          countInStock: Number(product.countInStock),
        }),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Error saving product");
      // After success: go back to product list
      router.push("/admin/products");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </h1>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </label>
        <label>
          Price:
          <input
            name="price"
            type="number"
            min="0"
            value={product.price}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label>
          Category:
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label>
          Brand:
          <input
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label>
          Count In Stock:
          <input
            name="countInStock"
            type="number"
            min="0"
            value={product.countInStock}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
        <button className={styles.submitBtn} type="submit">
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </section>
  );
}
