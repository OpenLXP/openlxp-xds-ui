import { fireEvent, render } from '@testing-library/react';

import Subscribed from '@/pages/lists/subscribed';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { useAuth } from '@/contexts/AuthContext';
import { useUnsubscribeFromList } from '@/hooks/useUnsubscribeFromList';
import { useSubscribedLists } from '@/hooks/useSubscribedLists';
import singletonRouter from 'next/router';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
// mocks
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUnsubscribeFromList', () => ({
  useUnsubscribeFromList: jest.fn(),
}));

jest.mock('@/hooks/useSubscribedLists', () => ({
  useSubscribedLists: jest.fn(),
}));

const mutateFn = jest.fn();

const renderer = () => {
  useAuth.mockImplementation(() => ({
    user: {
      user: {
        id: '1',
        email: '',
      },
    },
  }));

  useUnsubscribeFromList.mockImplementation(() => ({
    mutate: mutateFn,
  }));

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Subscribed />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Subscribed Page', () => {
  it('should render the page', () => {
    useSubscribedLists.mockImplementation(() => ({
      data: [],
      isSuccess: true,
    }));

    const { getByText } = renderer();
    expect(getByText('Subscribed Lists')).toBeInTheDocument();
  });

  describe('with data', () => {
    it('should render a list', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            id: '1',
            name: 'List 1',
            description: '',
            owner: {
              id: '1',
              email: '',
            },
            subscribers: [
              {
                id: '1',
                email: '',
              },
            ],
            experiences: [2, 23],
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('List 1')).toBeInTheDocument();
    });

    it('should render the number of subscribers in this list', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            id: '1',
            name: 'List 1',
            description: '',
            owner: {
              id: '1',
              email: '',
            },
            subscribers: [
              {
                id: '1',
                email: '',
              },
              {
                id: '2',
                email: '',
              },
            ],
            experiences: [2],
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('2')).toBeInTheDocument();
    });

    it('should render the number of experiences in the list', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            id: '1',
            name: 'List 1',
            description: '',
            owner: {
              id: '1',
              email: '',
            },
            subscribers: [],
            experiences: [2, 23],
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('2')).toBeInTheDocument();
    });

    it('should render the list name, and description', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            id: '1',
            name: 'List 1',
            description: 'List 1 description',
            owner: {
              id: '1',
              email: '',
            },
            subscribers: [],
            experiences: [2, 23],
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('List 1')).toBeInTheDocument();
      expect(getByText('List 1 description')).toBeInTheDocument();
    });

    describe('actions', () => {
      it('should fire mutation when unsubscribe is clicked', () => {
        useSubscribedLists.mockImplementation(() => ({
          data: [
            {
              id: '1',
              name: 'List 1',
              description: 'List 1 description',
              owner: {
                id: '1',
                email: '',
              },
              subscribers: [],
              experiences: [2, 23],
            },
          ],
          isSuccess: true,
        }));

        const { getByText } = renderer();
        fireEvent.click(getByText('Unsubscribe'));
        expect(mutateFn).toHaveBeenCalled();
      });

      it('should navigate the user to the new list', () => {
        useSubscribedLists.mockImplementation(() => ({
          data: [
            {
              id: '1',
              name: 'List 1',
              description: 'List 1 description',
              owner: {
                id: '1',
                email: '',
              },
              subscribers: [],
              experiences: [2, 23],
            },
          ],
          isSuccess: true,
        }));

        const { getByText } = renderer();
        fireEvent.click(getByText('View'));
        expect(singletonRouter).toMatchObject({
          asPath: '/lists/1',
        });
      });

      it('should navigate to the 401 error page', () => {
        useSubscribedLists.mockImplementation(() => ({
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
        useSubscribedLists.mockImplementation(() => ({
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
});
