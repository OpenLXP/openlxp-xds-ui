import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockAxios from 'jest-mock-axios';

import { useCourse } from '../../hooks/useCourse';
import courseData from '../../__mocks__/data/course.data';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock('axios');
test('should should return course data', async () => {
  mockAxios.get.mockResolvedValue({ data: courseData });
  const { result, waitForNextUpdate } = renderHook(() => useCourse(), {
    wrapper,
  });

  await waitForNextUpdate(result.current.isSuccess);
  expect(result.current.data).toEqual(courseData);
});
