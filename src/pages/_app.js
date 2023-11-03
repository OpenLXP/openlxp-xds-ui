'use strict';

import '../styles/globals.css';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head'

// contexts


// styles


export default function MyApp({ Component, pageProps }) {
  // to avoid sharing results from other users.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps['dehydratedState']}>
          <Head>
            <meta httpEquiv="Content-Security-Policy" content="script-src 'none'; img-src 'none'; "/>
            <title>Experience Discovery Service</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
