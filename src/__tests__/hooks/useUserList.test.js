import { renderHook } from '@testing-library/react-hooks';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { useUserList } from '@/hooks/useUserList';

import mockAxios from 'jest-mock-axios';

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should return a specific list', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });

  const { result, waitForNextUpdate } = renderHook(() => useUserList(), {
    wrapper,
  });

  await waitForNextUpdate(result.current.isSuccess);
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data).toEqual('success');
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
