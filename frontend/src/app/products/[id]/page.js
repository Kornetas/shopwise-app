import { fetchProductById } from "../../../services/productService";
import ProductDetails from "../../../views/ProductDetails/ProductDetails";
import styles from "./page.module.css";

// Main component for the product page
export default async function ProductPage({ params }) {
  const { id } = await params; // Get product id from route parameters

  let product;
  try {
    product = await fetchProductById(id); // // Try to fetch product data using the id
  } catch (e) {
    // If there is an error (for example, product not found) show error message
    return <div className={styles.error}>Product not found</div>;
  }

  // If the product was fetched successfully, render the product details component
  return <ProductDetails product={product} />;
}
