// tests for hooks/useSubscribedLists.js

import { useSubscribedLists } from 'hooks/useSubscribedLists';
import { renderHook } from '@testing-library/react-hooks';
import mockAxios from 'jest-mock-axios';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should return the mocked data', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });
  const { result, waitForNextUpdate } = renderHook(() => useSubscribedLists(), {
    wrapper,
  });
  await waitForNextUpdate(result.current.isSuccess);

  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data).toBe('success');
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
