// pages/product/[id].tsx
import React, { useEffect, useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Product } from '../../types/types';
import Image from 'next/image';
import { CartContext } from '@/services/cart-context';

interface Props {
  product: Product;
}

const ProductDetail: React.FC<Props> = ({ product }) => {
    const [isClient, setIsClient] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return <div>Loading...</div>;
    }
  return (
    <div>
         <span className="image"> 
      <h1>{product.title || 'Product Detail'}</h1>
   
    <Image src={product.image} alt={product.title} width={100} height={100} />
      <a href="#specs">see specifications</a>
      </span> 
      <span className="card">
      <details open>
        <summary>Description</summary>
        <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
      </details>

      <details >
        <summary id="specs">Specs</summary>
        <dl>
    {product.specs?.map((spec) => (
      <React.Fragment key={spec.key}>
        <dt><strong>{spec.name}:</strong></dt>
        <dd>{spec.value} {spec.unit}</dd>
      </React.Fragment>
    ))}
  </dl>
      </details>
      <p>${product.price}</p>
      <button onClick={() => {addToCart(product); alert('Product is added to cart')}}>Buy Now</button>
      </span>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pastebin.com/raw/c7u9fDJi');
  const products: Product[] = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch('https://pastebin.com/raw/c7u9fDJi');
  const products: Product[] = await res.json();
  const product = products.find((p) => p.id.toString() === params?.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
