// tests for useInterestLists hook

import { useInterestLists } from 'hooks/useInterestLists';
import mockAxios from 'jest-mock-axios';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';
import { renderHook } from '@testing-library/react-hooks';

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should make an api call', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });
  const { result, waitForNextUpdate } = renderHook(() => useInterestLists(), {
    wrapper,
  });
  await waitForNextUpdate(result.current.isSuccess);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(result.current.data).toEqual('success');
});
