import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockAxios from 'jest-mock-axios';

import useConfig from '../../hooks/useConfig';
import uiConfigData from '../../__mocks__/data/uiConfig.data';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock('axios');
test('should should return UI config data', async () => {
  mockAxios.get.mockResolvedValue({ data: uiConfigData });
  const { result, waitForNextUpdate } = renderHook(() => useConfig(), {
    wrapper,
  });

  await waitForNextUpdate(result.current.isSuccess);
  expect(result.current.data).toEqual(uiConfigData);
});
