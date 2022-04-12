// tests for [listId].js

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import {
  useAuthenticatedUser,
  useUnauthenticatedUser,
  useListMock,
  useListMockWith401,
  useListMockWith403,
  useListMockWithNoExperiences,
} from '@/__mocks__/predefinedMocks';
import { useList } from '@/hooks/useList';
import List, { getServerSideProps } from '@/pages/lists/[listId]';
import MockRouter from 'next-router-mock';
import singletonRouter from 'next/router';
import xAPIMapper from '@/utils/xapi/xAPIMapper';
import xAPISendStatement from '@/utils/xapi/xAPISendStatement';

// // mocking the useAuth hook
// jest.mock('@/contexts/AuthContext', () => ({
//   useAuth: jest.fn(),
// }));

// // mock useRouter
// jest.mock('next/dist/client/router', () => require('next-router-mock'));

// // mocking the useList hook
// jest.mock('@/hooks/useList', () => ({
//   useList: jest.fn(),
// }));

// const useListMock = () =>
//   useList.mockImplementation(() => ({
//     data: {
//       id: '1',
//       name: 'Test List',
//       owner: {
//         id: '1',
//         username: '',
//         email: 'admin@example.com',
//       },
//       description: 'test description',
//       experiences: [
//         {
//           Course: {
//             CourseTitle: 'Test Title',
//             CourseProviderName: 'Course Provider Name',
//           },
//           meta: {
//             id: '1',
//             metadata_key_hash: '1',
//           },
//         },
//       ],
//     },
//     isSuccess: true,
//     isError: false,
//   }));

// const useListMockWithNoExperiences = () =>
//   useList.mockImplementation(() => ({
//     data: {
//       id: '1',
//       name: 'Test List',
//       owner: {
//         id: '1',
//         username: '',
//         email: 'test@test.com',
//       },
//       description: 'test description',
//       experiences: [],
//     },
//     isSuccess: true,
//     isError: false,
//   }));

// const useListMockWith401 = () =>
//   useList.mockImplementation(() => ({
//     data: {},
//     isSuccess: false,
//     isError: true,
//     error: {
//       response: {
//         status: 401,
//       },
//     },
//   }));

// const useListMockWith403 = () =>
//   useList.mockImplementation(() => ({
//     data: {},
//     isSuccess: false,
//     isError: true,
//     error: {
//       response: {
//         status: 403,
//       },
//     },
//   }));

// const useAuthenticatedUser = () =>
//   useAuth.mockReturnValue({
//     user: {
//       user: {
//         id: '1',
//         username: 'test',
//         email: '',
//       },
//     },
//   });

// const useUnauthenticatedUser = () =>
//   useAuth.mockReturnValue({
//     user: null,
//   });

// render function that wraps the component with query client wrapper
const renderer = (isAuth = true) => {
  MockRouter.setCurrentUrl('/lists/1');

  // returns the wrapped render object
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <List listId={1} />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('List page', () => {
  test('should render', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    expect(getByText('Test List')).toBeInTheDocument();
  });

  test('should not render edit button when unauthenticated', () => {
    useListMock();
    useUnauthenticatedUser();
    const { queryByText } = renderer();
    expect(queryByText('Edit list')).not.toBeInTheDocument();
  });

  test('should render edit button when authenticated', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    expect(getByText('Edit list')).toBeInTheDocument();
  });

  test('should navigate a user to the specific course', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    const course = getByText('Test Title');
    fireEvent.click(course);
    expect(singletonRouter).toMatchObject({ asPath: '/course/1' });
  });

  test('should navigate a user to the edit page', () => {
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    const editButton = getByText('Edit list');
    fireEvent.click(editButton);
    expect(singletonRouter).toMatchObject({ asPath: '/lists/edit/1' });
  });

  test('should navigate user to 401 page', () => {
    useListMockWith401();
    useAuthenticatedUser();
    renderer();

    expect(singletonRouter).toMatchObject({ asPath: '/401' });
  });

  test('should navigate user to 403 page', () => {
    useListMockWith403();
    useAuthenticatedUser();
    renderer();

    expect(singletonRouter).toMatchObject({ asPath: '/403' });
  });

  test('should show "No courses added yet." message', () => {
    useListMockWithNoExperiences();
    useAuthenticatedUser();

    const { getByText } = renderer();
    expect(getByText(/No courses added yet./i)).toBeInTheDocument();
  });

  test.skip('should send a statement to the LRS', async () => {
    const spy = jest.spyOn(xAPISendStatement, '');
    useListMock();
    useAuthenticatedUser();
    const { getByText } = renderer();
    const course = getByText('Test Title');
    fireEvent.click(course);
    expect(spy.mock.calls[0][0]).toHaveBeenCalled();
  });
});

describe('List page server side', () => {
  test('context', () => {
    const context = { query: { listId: '1' } };
    const data = getServerSideProps(context);
    expect(data).toEqual({ props: { listId: '1' } });
  });
});
