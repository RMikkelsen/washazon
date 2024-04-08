
"use client"
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Product } from '../../src/types/types';
import Image from 'next/image';
import mockData from '../../public/mock-data/Washing Machines PDP.json';



const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
        <h1>Product List</h1>
        <ul>
            {products?.map((product) => (
                <li key={product.id}>
                    <Link href={`/product/${product.id}`}>
                        <Image src={product.image} alt={product.title} width={100} height={100} />
                        <h2>{product.title}</h2>
                        <p>${product.price}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = mockData;

  return {
    props: {
      products,
    },
  };
};

export default ProductList;