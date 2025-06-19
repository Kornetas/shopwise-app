import ProductForm from "../../../../../views/Admin/AdminProductForm/AdminProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return <ProductForm mode="edit" productId={id} />;
}
