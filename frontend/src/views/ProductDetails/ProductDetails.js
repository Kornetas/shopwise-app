import styles from "./ProductDetails.module.css";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

export default function ProductDetails({ product }) {
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
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
