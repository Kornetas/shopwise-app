import styles from "./page.module.css";
import { fetchProductById } from "../../../services/productService";

// Product details page (client rendered by default in App Router)
export default async function ProductPage({ params }) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProductById(id);
  } catch (e) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.brand}>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className={styles.price}>
          <strong>Price:</strong> {product.price} zł
        </p>
        <p className={styles.desc}>{product.description}</p>
        <button className={styles.btn}>Add to cart</button>
      </div>
    </main>
  );
}
