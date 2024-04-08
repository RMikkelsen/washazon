
import ProductList from "@/components/product-list";
import mockData from "../../public/mock-data/Washing Machines PDP.json";
import Header from "@/components/header";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function Home() {
  const products: Product[] = mockData.map((item) => ({
    ...item,
    title: item.name, 
  }));

  return <>

  <ProductList products={products} />
  </>;
}
