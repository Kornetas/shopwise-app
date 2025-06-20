import styles from "./ProductDetails.module.css";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import { getImageUrl } from "../../utils/api"; // Import helpera

// Component for showing product details
export default function ProductDetails({ product }) {
  // Get the full image URL using helper
  const imageUrl = product.image ? getImageUrl(product.image) : "";

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {/* Product name */}
        <h1 className={styles.title}>{product.name}</h1>

        {/* Product image */}
        {imageUrl && (
          <div className={styles.imageBox}>
            <img
              src={imageUrl}
              alt={product.name}
              className={styles.image}
              width={200}
              height="auto"
            />
          </div>
        )}

        {/* Product brand */}
        <p className={styles.brand}>
          <strong>Brand:</strong> {product.brand}
        </p>

        {/* Product price */}
        <p className={styles.price}>
          <strong>Price:</strong> {product.price} €
        </p>

        {/* Product description */}
        <p className={styles.desc}>{product.description}</p>

        {/* Add to cart button */}
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
