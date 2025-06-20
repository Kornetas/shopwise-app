"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminProductForm.module.css";
import { getApiEndpoint, getImageUrl } from "../../../utils/api";

// ProductForm for creating or editing a product (admin only)
export default function ProductForm({ mode = "add", productId }) {
  // Product state fields
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
  const [uploading, setUploading] = useState(false); // Image uploading state
  const router = useRouter();

  // If in edit mode, fetch product data from API
  useEffect(() => {
    if (mode === "edit" && productId) {
      async function fetchProduct() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(getApiEndpoint(`/products/${productId}`), {
            credentials: "include",
          });
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

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  // Handle image upload to backend
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(getApiEndpoint("/upload"), {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProduct((prev) => ({ ...prev, image: data.imageUrl }));
    } catch (err) {
      setError("Image upload failed: " + err.message);
    }
    setUploading(false);
  }

  // Handle form submit: send new/updated product to API
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
          ? getApiEndpoint("/products")
          : getApiEndpoint(`/products/${productId}`);
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
      // Go back to product list after successful submit
      router.push("/admin/products");
    } catch (err) {
      setError(err.message);
    }
  }

  // Show loading message while fetching
  if (loading) return <div className={styles.loading}>Loading...</div>;

  // Render form for adding or editing product
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </h1>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Product name */}
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
        {/* Product description */}
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
        {/* Product price */}
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
        {/* Product category */}
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
        {/* Product brand */}
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
        {/* Image upload */}
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.input}
            disabled={uploading}
          />
          {uploading && <span className={styles.uploading}>Uploading...</span>}
          {product.image && (
            <div className={styles.preview}>
              {/* Always serve image directly from backend/static folder */}
              <img src={getImageUrl(product.image)} alt="Preview" width={80} />
              <span>{product.image}</span>
            </div>
          )}
        </label>
        {/* Product stock count */}
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
        {/* Submit button */}
        <button className={styles.submitBtn} type="submit">
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </section>
  );
}
