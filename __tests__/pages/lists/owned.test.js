import { render } from '@testing-library/react';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';
import listData from '../../../__mocks__/data/userLists.data';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Owned from 'pages/lists/owned';
import { useAuth } from 'contexts/AuthContext';
import { useUserOwnedLists } from 'hooks/useUserOwnedLists';
import singletonRouter from 'next/router';

// mock the router
jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../hooks/useUserOwnedLists', () => ({
  useUserOwnedLists: jest.fn(),
}));

const renderer = (isAuth = false) => {
  // mocking useAuth state
  if (isAuth) {
    useAuth.mockImplementation(() => ({
      user: { user: { id: 1 } },
    }));
  } else {
    useAuth.mockImplementation(() => ({
      user: null,
    }));
  }

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Owned />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

// cleanup
afterEach(() => {
  jest.clearAllMocks();
});

// Tests
describe('User Owned Lists', () => {
  it('should render title for page', () => {
    // mock the list data
    useUserOwnedLists.mockReturnValue({
      data: listData,
    });

    // render the page
    const { getByText } = renderer(true);

    // assert the title
    expect(getByText('My Lists')).toBeInTheDocument();
  });
  describe('with user', () => {
    it('should show the card title and description', () => {
      // mock the list data
      useUserOwnedLists.mockImplementation(() => ({
        data: listData,
        isSuccess: true,
      }));

      // render the page
      const { getByText } = renderer(true);

      // assert the title
      expect(getByText(listData[0].name)).toBeInTheDocument();
      expect(getByText(listData[0].description)).toBeInTheDocument();
    });
    it('should show the number of subscribers to a specific list', () => {
      // mock the list data
      useUserOwnedLists.mockImplementation(() => ({
        data: listData,
        isSuccess: true,
      }));

      // render the page
      const { getByText } = renderer(true);

      // assert the title
      expect(getByText('0')).toBeInTheDocument();
    });
    it('should show the number of courses in a specific list', () => {
      // mock the list data
      useUserOwnedLists.mockImplementation(() => ({
        data: listData,
        isSuccess: true,
      }));

      // render the page
      const { getByText } = renderer(true);

      // assert the title
      expect(getByText('2')).toBeInTheDocument();
    });
    describe('actions', () => {
      it('should navigate the user to the edit page when clicked', () => {
        // mock the list data
        useUserOwnedLists.mockImplementation(() => ({
          data: listData,
          isSuccess: true,
        }));

        // render the page
        const { getByText } = renderer(true);

        // act
        const editButton = getByText('Edit');
        editButton.click();

        // assert
        expect(singletonRouter).toMatchObject({ asPath: '/lists/edit/1' });
      });
      it('should navigate the user to the view page when clicked', () => {
        // mock the list data
        useUserOwnedLists.mockImplementation(() => ({
          data: listData,
          isSuccess: true,
        }));

        // render the page
        const { getByText } = renderer(true);

        // act
        const viewButton = getByText('View');
        viewButton.click();

        // assert
        expect(singletonRouter).toMatchObject({ asPath: '/lists/1' });
      });

      it('should navigate to the 401 error page', () => {
        useUserOwnedLists.mockImplementation(() => ({
          data: [
          ],
          isSuccess: false,
          isError: true,
          error:{
            response:{
              status:401,
            }
          },
        }));

        const { getByText } = renderer();
        expect(singletonRouter).toMatchObject({
          asPath: '/401',
        });
      });

      it('should navigate to the 403 error page', () => {
        useUserOwnedLists.mockImplementation(() => ({
          data: [
          ],
          isSuccess: false,
          isError: true,
          error:{
            response:{
              status:403,
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

  describe('without user', () => {
    it('should navigate a user away from the page', () => {
      // mock the list data
      useUserOwnedLists.mockImplementation(() => ({
        data: listData,
        isSuccess: true,
      }));

      // render the page
      const { getByText } = renderer(false);

      // assert
      expect(singletonRouter).toMatchObject({ asPath: '/' });
    });
  });
});
