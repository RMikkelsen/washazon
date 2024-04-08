import React from 'react';
import { AppProps } from 'next/app';
import Header from '../components/header'; 
import Layout from '@/app/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header products={[]} />
<Component {...pageProps} />
    </>
  );
}

export default MyApp;