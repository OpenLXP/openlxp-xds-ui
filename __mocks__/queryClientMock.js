import { QueryClientProvider, QueryClient } from 'react-query';

export const AuthContextWrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
  );
};
