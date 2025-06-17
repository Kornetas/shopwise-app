import { fetchProducts } from "../services/productService";

export default async function HomePage() {
  let products = [];
  try {
    products = await fetchProducts();
  } catch (e) {
    // Just show error for now
    return <div style={{ color: "red" }}>Error: {e.message}</div>;
  }

  return (
    <main style={{ margin: "2rem auto", padding: "1rem" }}>
      <h1>Shopwise – Products</h1>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            <strong>{prod.name}</strong> – {prod.price} zł
          </li>
        ))}
      </ul>
    </main>
  );
}
