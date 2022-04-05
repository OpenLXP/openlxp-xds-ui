// tests for [listId].js

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, act } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import MockRouter from 'next-router-mock';
import { useList } from '@/hooks/useList';
import xAPIMapper from "@/utils/xapi/xAPIMapper";

import List from '@/pages/lists/[listId]';
import singletonRouter from 'next/router';

// mocking the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// mock useRouter
jest.mock('next/dist/client/router', () => require('next-router-mock'));
// mocking the useList hook
jest.mock('@/hooks/useList', () => ({
  useList: jest.fn(),
}));

const useListMock = () => (
  useList.mockImplementation(() => ({
    data: {
      id: '1',
      name: 'test',
      owner: {
        id: '1',
        username: '',
        email: 'admin@example.com',
      },
      description: 'test description',
      experiences: [
        {
          Course: {
            CourseTitle: 'Test Title',
            CourseProviderName: 'Course Provider Name',
          },
          meta: {
            id: '1',
            metadata_key_hash: '1',
          },
        },
      ],
    },
    isSuccess: true,
  }))
)

// render function that wraps the component with query client wrapper
const renderer = (isAuth = true) => {
  // defaults user to logged in
  if (!isAuth) {
    useAuth.mockReturnValue({
      user: null,
    });
  } else {
    useAuth.mockReturnValue({
      user: {
        user: {
          id: '1',
          username: 'test',
          email: '',
        },
      },
    });
  }
  MockRouter.setCurrentUrl('/lists/1');

  // returns the wrapped render object
  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <List />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};
// test for the component
describe('[listId].js', () => {
  // test for the component
  it('renders the component', () => {
    // render the component
    useList.mockImplementation(() => ({
      data: {
        id: '1',
        name: 'test',
        owner: {
          id: '1',
          username: 'test',
          email: '',
        },
        updated: '',
        description: 'test description',
        experiences: [],
      },
      isSuccess: true,
    }));
    const { container } = renderer();
    // assert that the component is rendered
    expect(container).toBeTruthy();
  });

  describe('when the user is not logged in', () => {
    // test for the component
    it('should navigate the user away from the page.', () => {
      // render the component
      useList.mockImplementation(() => ({
        data: {
          id: '1',
          name: 'test',
          owner: {
            id: '1',
            username: 'test',
            email: '',
          },
          updated: '',
          description: 'test description',
          experiences: [],
        },
        isSuccess: true,
      }));
      const { container } = renderer(false);
      // should navigate the user away from the page
      expect(singletonRouter).toMatchObject({
        asPath: '/',
      });
    });
  });

  describe('when the user is logged in', () => {
    // test for the component
    it('should render the title, owner, updated, and description.', () => {
      // mock the useLists
      useList.mockImplementation(() => ({
        data: {
          id: '1',
          name: 'test',
          owner: {
            id: '1',
            username: '',
            email: 'admin@example.com',
          },
          updated: '',
          description: 'test description',
          experiences: [],
        },
        isSuccess: true,
      }));

      // render the component
      const { getByText } = renderer();
      // assert that the title, owner, updated, and description are rendered
      expect(getByText('test')).toBeInTheDocument();
    });
    it('should render the list of courses.', () => {
      useListMock();

      // render the component
      const { getByText } = renderer();
      // assert that the list of courses are rendered
      expect(getByText('Test Title')).toBeInTheDocument();
      expect(getByText('Course Provider Name')).toBeInTheDocument();
      expect(getByText('View')).toBeInTheDocument();
    });

    it('should render a message when no courses are in the list', () => {
      useList.mockImplementation(() => ({
        data: {
          id: '1',
          name: 'test',
          owner: {
            id: '1',
            username: '',
            email: 'admin@example.com',
          },
          description: 'test description',
          experiences: [],
        },
        isSuccess: true,
      }));

      // render the component
      const { getByText } = renderer();

      // assert that the message is rendered
      expect(getByText('No courses in this list')).toBeInTheDocument();
    });
    describe('actions', () => {
      it('should navigate user away from page when view is clicked', () => {
        useListMock();

        // render the component
        const { getByText } = renderer();
        // click the view button
        fireEvent.click(getByText('View'));
        // should navigate the user away from the page
        expect(singletonRouter).toMatchObject({
          asPath: '/course/1',
        });
      });

      it('should send xAPI statement when view course is clicked.', () => {
        
        useListMock();
        // render the component
        const { getByText } = renderer();
        // click the view button

        const spy = jest.spyOn(xAPIMapper, 'sendStatement')
          .mockImplementation(() => Promise.resolve({})
          );

        act(() => {
          fireEvent.click(getByText('View'));
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      it('should navigate to the 403 error page', () => {
        useList.mockImplementation(() => ({
          data: [
          ],
          isSuccess: false,
          isError: true,
          error: {
            response: {
              status: 403,
            }
          },
        }));

        const { getByText } = renderer();
        expect(singletonRouter).toMatchObject({
          asPath: '/403',
        });
      });

      it('should navigate to the 403 error page', () => {
        useList.mockImplementation(() => ({
          data: [
          ],
          isSuccess: false,
          isError: true,
          error: {
            response: {
              status: 403,
            }
          },
        }));

        const { getByText } = renderer();
        expect(singletonRouter).toMatchObject({
          asPath: '/403',
        });
      });
    });
  });
});
