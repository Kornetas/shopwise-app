import { fetchProducts } from "../../services/productService";
import styles from "./MainPage.module.css";
import ProductsList from "../ProductsList/ProductsList";

// Main page of the shop – shows all products
export default async function MainPage() {
  let products = [];
  try {
    // Try to fetch all products from backend
    products = await fetchProducts();
  } catch (e) {
    // If there is an error, show error message
    return <div style={{ color: "red" }}>Error: {e.message}</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Shopwise – Products</h1>
      {/* Show list of products */}
      <ProductsList products={products} />
    </main>
  );
}
