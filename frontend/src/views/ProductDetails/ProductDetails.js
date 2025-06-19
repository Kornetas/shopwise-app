import styles from "./ProductDetails.module.css";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

// Component for showing product details
export default function ProductDetails({ product }) {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {/* Show product name */}
        <h1 className={styles.title}>{product.name}</h1>
        {/* Show brand */}
        <p className={styles.brand}>
          <strong>Brand:</strong> {product.brand}
        </p>
        {/* Show price */}
        <p className={styles.price}>
          <strong>Price:</strong> {product.price} €
        </p>
        {/* Show description */}
        <p className={styles.desc}>{product.description}</p>
        {/* Add to cart button */}
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
