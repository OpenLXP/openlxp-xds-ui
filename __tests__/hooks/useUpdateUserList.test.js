import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockAxios from 'jest-mock-axios';

import useUpdateUserList from '../../hooks/useUpdateUserList';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

it('should make a patch call and return new data', async () => {
  // mockAxios
  mockAxios.patch.mockReturnValue( { data: { message: 'tada' } } );
  const { result, waitForNextUpdate } = renderHook(
    () => useUpdateUserList('token'),
    { wrapper }
  );

  await waitForNextUpdate(
    result.current.mutate({ listData: 'tada', id: 'tada' })
  );

  expect(mockAxios.patch).toHaveBeenCalled();
});
