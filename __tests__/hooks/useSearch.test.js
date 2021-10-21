import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockAxios from 'jest-mock-axios';

import { useSearch } from '../../hooks/useSearch';
import searchData from '../../__mocks__/data/search.data';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('should return a list of courses found', async () => {
  mockAxios.get.mockResolvedValue({ data: searchData });

  const { result, waitForNextUpdate } = renderHook(() => useSearch(), {
    wrapper,
  });

  await waitForNextUpdate(result.current.isSuccess);

  expect(result.current.data).toEqual(searchData);
});
