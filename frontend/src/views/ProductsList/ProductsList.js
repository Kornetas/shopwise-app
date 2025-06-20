import Link from "next/link";
import styles from "./ProductsList.module.css";
import { getImageUrl } from "../../utils/api"; // Import the helper

// Component to display list of products
export default function ProductsList({ products }) {
  return (
    <ul className={styles.list}>
      {products.map((prod) => {
        // Get full image URL using the helper
        const imageUrl = prod.image ? getImageUrl(prod.image) : "";

        return (
          <li key={prod._id} className={styles.listItem}>
            {/* Product thumbnail */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={prod.name}
                width={50}
                height="auto"
                className={styles.thumb}
              />
            )}
            {/* Link to product details page */}
            <Link href={`/products/${prod._id}`}>
              <strong>{prod.name}</strong>
            </Link>
            {" – "}
            {/* Show product price */}
            {prod.price} €
          </li>
        );
      })}
    </ul>
  );
}
