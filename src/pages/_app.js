import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useState } from 'react';
import Head from 'next/head'

// contexts
import { AuthProvider } from '../contexts/AuthContext';

// styles
import '../styles/globals.css';

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
