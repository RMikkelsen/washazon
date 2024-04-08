"use client";
import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { Product } from "../../src/types/types";
import Image from "next/image";
import mockData from "../../public/mock-data/Washing Machines PDP.json";
import style from "../styles/product-list.module.css";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
      <h1>Product List</h1>
      <ul className={style.list}>
        {products?.map((product) => (
          <li key={product.id} className={style.listItems}>
            <Link href={`/product/${product.id}`}>
              <Image
              className={style.productImage}
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
              />
              <h2>{product.name}</h2>
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
