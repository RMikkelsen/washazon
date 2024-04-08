import { Product } from '@/types/types';
import React from 'react';

export const CartContext = React.createContext({
  cart: [] as Product[],
  addToCart: (product: Product) => {},
});