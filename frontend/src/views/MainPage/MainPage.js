import { fetchProducts } from "../../services/productService";
import styles from "./MainPage.module.css";
import ProductsList from "../ProductsList/ProductsList";

export default async function MainPage() {
  let products = [];
  try {
    products = await fetchProducts();
  } catch (e) {
    return <div style={{ color: "red" }}>Error: {e.message}</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Shopwise – Products</h1>

      <ProductsList products={products} />
    </main>
  );
}
