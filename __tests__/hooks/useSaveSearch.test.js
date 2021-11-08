// test cases for useSaveSearch hook
import { useSaveSearchList } from '../../hooks/useSaveSearch';
import { renderHook, act } from '@testing-library/react-hooks';

import { QueryClientWrapper } from '../../__mocks__/queryClientMock';
import mockAxios from 'jest-mock-axios';

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

it('should return the data from axios mock', async () => {
  mockAxios.get.mockResolvedValue({ data: 'success' });
  const { result, waitForNextUpdate } = renderHook(() => useSaveSearchList(), {
    wrapper,
  });

  await waitForNextUpdate(result.current.isSuccess);
  expect(result.current.isSuccess).toBe(true);
  expect(result.current.data).toBe('success');
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
