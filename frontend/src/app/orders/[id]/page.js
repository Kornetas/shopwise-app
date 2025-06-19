import OrderDetailsView from "../../../views/Orders/OrderDetailsView/OrderDetailsView";

// Dynamic route for order details (App Router)
export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  return <OrderDetailsView orderId={id} />;
}
