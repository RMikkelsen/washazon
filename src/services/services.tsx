
import { Product } from '../types/types';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://pastebin.com/raw/c7u9fDJi');
  const products: Product[] = await res.json();
  return products;
}