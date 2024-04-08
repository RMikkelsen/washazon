"use client";
import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { CartContext } from "@/services/cart-context";
import { Product } from "@/types/types";
import Header from "@/components/header";

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  return (
    <>
      <CartContext.Provider value={{ cart, addToCart }}>
        <Header />
        <Component {...pageProps} />
      </CartContext.Provider>
    </>
  );
}

export default MyApp;
