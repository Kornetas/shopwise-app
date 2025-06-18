import Link from "next/link";
import styles from "./ProductsList.module.css";

export default function ProductsList({ products }) {
  return (
    <ul className={styles.list}>
      {products.map((prod) => (
        <li key={prod._id} className={styles.listItem}>
          <Link href={`/products/${prod._id}`}>
            <strong>{prod.name}</strong>
          </Link>
          {" – "}
          {prod.price} €
        </li>
      ))}
    </ul>
  );
}
