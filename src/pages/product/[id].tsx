// pages/product/[id].tsx
import React, { useEffect, useState, useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "../../types/types";
import Image from "next/image";
import { CartContext } from "@/services/cart-context";
import styles from "../../styles/[id].module.css";

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
    <div className={styles.container}>
    <div className={styles.grid}>
      <span className={styles.image}>
        <h1>{product.name || "Product name missing"}</h1>

        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
        />
        <a href="#specs">see specifications</a>
      </span>
      <span className={styles.card}>
        <h3>{product.name || "title missing"}</h3>
        <p>${product.price}</p>
        <button
          onClick={() => {
            addToCart(product);
            alert("Product is added to cart");
          }}
          className={styles.button}
        >
          Buy Now
        </button>
        <details open>
          <summary className={styles.summary}>Description</summary>
          <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
        </details>

        <details>
          <summary id="specs" className={styles.summary}>
            Specs
          </summary>

          <dl className={styles.border}>
            {product.specs?.map((spec) => (
              <React.Fragment key={spec.key}>
                <div key={spec.key} className={styles.specs}>
                  <dt className={styles.specs}>
                    <strong>{spec.name}:</strong>
                  </dt>
                  <dd className={styles.specs}>
                    {spec.value} {spec.unit}
                  </dd>
                </div>
              </React.Fragment>
            ))}
          </dl>
        </details>
      </span>
    </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pastebin.com/raw/c7u9fDJi");
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
  const res = await fetch("https://pastebin.com/raw/c7u9fDJi");
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
