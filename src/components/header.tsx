import React, { useState, useEffect, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import { Product } from "../types/types";
import { CartContext } from "@/services/cart-context";
import style from "../styles/header.module.css";
import Link from 'next/link';

interface Props {
  products?: Product[];
}

const Header: React.FC<Props> = ({ products }) => {
  const { cart } = useContext(CartContext);
 
  const router = useRouter();



  return (
    <header className={style.headerLine}>
      <Link href="/" className={style.title}><h1>Washazon</h1></Link>
      <form >
        <input
          type="search"
          placeholder="Search products"
        
        />
      </form>
      <span>
        <FaShoppingCart />
        {cart.length}
      </span>
    </header>
  );
};

export default Header;
