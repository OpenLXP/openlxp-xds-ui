import React, { useState } from 'react';
import { AuthProvider } from 'contexts/AuthContext';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  // to avoid sharing results from other users.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps['dehydratedState']}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
