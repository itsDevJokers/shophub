// app/page.tsx
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  const productsData = await res.json();

  return <HomeClient initialProducts={productsData} />;
}
