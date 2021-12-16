import { act, fireEvent, render } from '@testing-library/react';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';
import SearchLists from '../../../pages/lists/searchLists';
import { useAuth } from '../../../contexts/AuthContext';
import { useSubscribedLists } from '../../../hooks/useSubscribedLists';
import { useUnsubscribeFromList } from '../../../hooks/useUnsubscribeFromList';
import { useSubscribeToList } from '../../../hooks/useSubscribeToList';
import { useInterestLists } from '../../../hooks/useInterestLists';

// mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mock useInterestLists
jest.mock('../../../hooks/useInterestLists', () => ({
  useInterestLists: jest.fn(),
}));

// mock useSubscribedLists
jest.mock('../../../hooks/useSubscribedLists', () => ({
  useSubscribedLists: jest.fn(),
}));
// mock useUnsubscribeFromList
jest.mock('../../../hooks/useUnsubscribeFromList', () => ({
  useUnsubscribeFromList: jest.fn(),
}));

// mock useSubscribeToList
jest.mock('../../../hooks/useSubscribeToList', () => ({
  useSubscribeToList: jest.fn(),
}));

// mock auth
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const unsubscribeFromList = jest.fn();
const subscribeToList = jest.fn();

const renderer = () => {
  useUnsubscribeFromList.mockImplementation(() => ({
    mutate: unsubscribeFromList,
  }));
  useSubscribeToList.mockImplementation(() => ({
    mutate: subscribeToList,
  }));

  useAuth.mockImplementation(() => ({
    user: {
      user: {
        id: '1',
        name: 'test',
        email: '',
      },
    },
  }));

  return render(
    <QueryClientWrapper>
      <SearchLists />
    </QueryClientWrapper>
  );
};
describe('Search Lists', () => {
  describe('static', () => {
    useSubscribedLists.mockImplementation(() => ({
      data: [],
    }));
    useInterestLists.mockImplementation(() => ({
      data: [],
      isSuccess: true,
    }));
    it('should render the title', () => {
      const { getByText } = renderer();
      expect(getByText(/search list catalog/i)).toBeInTheDocument();
    });
    it('should render the search bar', () => {
      const { getByPlaceholderText } = renderer();
      expect(getByPlaceholderText(/search the catalog/i)).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    it('should show a list of lists available', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText(/test/i)).toBeInTheDocument();
    });
    it('should not show the list if the user is the owner', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '1',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));

      const { queryByText } = renderer();
      expect(queryByText(/test/i)).not.toBeInTheDocument();
    });
    it('should show subscribe', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText(/subscribe/i)).toBeInTheDocument();
      act(() => {
        fireEvent.click(getByText(/subscribe/i));
      });
    });
    it('should show unsubscribe', () => {
      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText(/unsubscribe/i)).toBeInTheDocument();
      act(() => {
        fireEvent.click(getByText(/unsubscribe/i));
      });
      expect(getByText(/subscribe/i)).toBeInTheDocument();

    });
    it('should show next when more than 10 lists exist.', () => {
      const interestListsCreated = [...Array(11).keys()].map((i) => ({
        name: `test${i}`,
        id: `${i}`,
        owner: {
          id: '2',
          name: 'test',
          email: '',
        },
      }));

      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: interestListsCreated,
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText(/next/i)).toBeInTheDocument();
    });

    it('should show previous button after clicking the next button', () => {
      const interestListsCreated = [...Array(11).keys()].map((i) => ({
        name: `test${i}`,
        id: `${i}`,
        owner: {
          id: '2',
          name: 'test',
          email: '',
        },
      }));

      useSubscribedLists.mockImplementation(() => ({
        data: [
          {
            name: 'test',
            id: '123',
            owner: {
              id: '2',
              name: 'test',
              email: '',
            },
          },
        ],
        isSuccess: true,
      }));
      useInterestLists.mockImplementation(() => ({
        data: interestListsCreated,
        isSuccess: true,
      }));

      const { getByText } = renderer();

      act(() => {
        fireEvent.click(getByText(/next/i));
      });

      expect(getByText(/previous/i)).toBeInTheDocument();

      act(() => {
        fireEvent.click(getByText(/previous/i));
      });
    });
  });
});
