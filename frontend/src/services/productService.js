// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Fetch all porducts from backend
export async function fetchProducts() {
  // Call API endpoint for all products
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    // If response not ok, throw error
    throw new Error("Failed to fetch products");
  }
  // Return data (JSON)
  return res.json();
}

// Fetch single product by id from backend
export async function fetchProductById(id) {
  // Call API endpoint for one product
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  // Return data (JSON)
  return res.json();
}
