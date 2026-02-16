import { getSession } from "@/app/lib/session";
import { fetchProducts } from "@/services/getProducts";
import ProductList from "./ProductList";
import { redirect } from "next/navigation";

export default async function ProductsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  // Fetch initial products on the server
  let initialProducts: any[] = [];
  try {
    initialProducts = await fetchProducts({ token: session.token });
  } catch (error) {
    console.error("Failed to fetch initial products:", error);
    // Session might be invalid, but let's let the client handle re-auth or show empty state
  }

  return (
    <ProductList
      initialProducts={initialProducts}
      user={session.user}
      token={session.token}
    />
  );
}
