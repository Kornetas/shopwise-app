import Link from "next/link";
import styles from "./ProductsList.module.css";

// Component to display list of products
export default function ProductsList({ products }) {
  return (
    <ul className={styles.list}>
      {products.map((prod) => (
        <li key={prod._id} className={styles.listItem}>
          {/* Link to product details page */}
          <Link href={`/products/${prod._id}`}>
            <strong>{prod.name}</strong>
          </Link>
          {" – "}
          {/* Show price */}
          {prod.price} €
        </li>
      ))}
    </ul>
  );
}
