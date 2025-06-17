import { fetchProductById } from "../../../services/productService";
import ProductDetails from "../../../views/ProductDetails/ProductDetails";
import styles from "./page.module.css";

export default async function ProductPage({ params }) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProductById(id);
  } catch (e) {
    return <div className={styles.error}>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}
