import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Product } from '../types/types';
import { CartContext } from '@/services/cart-context';

interface Props {
  products: Product[];
}

const Header: React.FC<Props> = ({ products }) => {
    const { cart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const product = products.find(
      (product) => product.title.toLowerCase() === search.toLowerCase()
    );

    if (product && typeof window !== 'undefined') {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <header>
      <h1>My Store</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search products"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <FaShoppingCart />
      <span>{cart.length}</span>
    </header>
  );
};

export default Header;