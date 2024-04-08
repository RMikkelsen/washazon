import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Product } from '../types/types';

interface Props {
  products: Product[];
}

const Header: React.FC<Props> = ({ products }) => {
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
      <h1>Washazon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search products"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <FaShoppingCart />
    </header>
  );
};

export default Header;