import { render } from '@testing-library/react';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import SavedSearches from '../../../pages/lists/savedSearches';
import { useSaveSearchList } from '../../../hooks/useSaveSearch';
import { useAuth } from '../../../contexts/AuthContext';
import { useDeleteSavedSearch } from 'hooks/useDeleteSavedSearch';
import singletonRouter from 'next/router';
// mock useRouter
jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mock useSaveSearchList
jest.mock('../../../hooks/useSaveSearch', () => ({
  useSaveSearchList: jest.fn(),
}));

// mock useDeleteSavedSearch
jest.mock('../../../hooks/useDeleteSavedSearch', () => ({
  useDeleteSavedSearch: jest.fn(),
}));

// mocking useAuth
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// renderer
const renderer = () => {
  useAuth.mockImplementation(() => ({
    user: {
      user: {
        id: 'userId',
        email: '',
      },
    },
  }));

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <SavedSearches />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

const mutateFn = jest.fn();

beforeEach(() => {
  useDeleteSavedSearch.mockImplementation(() => ({
    mutate: mutateFn,
  }));
});

describe('Save Searches', () => {
  describe('static', () => {
    it('should render the title of the page', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [
          {
            id: 'searchId',
            name: 'searchName',
            query: 'query',
            createdAt: '2020-01-01',
          },
        ],
        isSuccess: true,
      }));
      const { getByText } = renderer();
      expect(getByText('Saved Searches')).toBeInTheDocument();
    });
    it('should render the table column names', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [
          {
            id: 'searchId',
            name: 'searchName',
            query: 'query',
            createdAt: '2020-01-01',
          },
        ],
        isSuccess: true,
      }));
      const { getByText } = renderer();
      expect(getByText(/search title/i)).toBeInTheDocument();
      expect(getByText('Query')).toBeInTheDocument();
    });
  });
  describe('with data', () => {
    it('should render the list', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [
          {
            id: 'searchId',
            name: 'searchName',
            query: 'query',
            createdAt: '2020-01-01',
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('searchName')).toBeTruthy();
    });

    it('should render the error message', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [],
        isSuccess: false,
        isError: true,
      }));

      const { getByText } = renderer();
      expect(
        getByText('There was an error loading your saved searches')
      ).toBeTruthy();
    });

    it('should render the loading message', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [],
        isSuccess: false,
        isLoading: true,
      }));

      const { getByText } = renderer();
      expect(getByText('Loading...')).toBeTruthy();
    });

    it('should render the empty message', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      expect(getByText('You have no saved searches')).toBeTruthy();
    });
  });

  describe('actions', () => {
    it('should call mutate on the click of delete', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [
          {
            id: 'searchId',
            name: 'searchName',
            query: 'query',
            createdAt: '2020-01-01',
          },
        ],
        isSuccess: true,
      }));

      const { getByText } = renderer();
      const deleteButton = getByText('Delete');
      deleteButton.click();
      expect(mutateFn).toHaveBeenCalled();
    });

    it('should navigate to the link on the click of the view button', () => {
      useSaveSearchList.mockImplementation(() => ({
        data: [
          {
            id: 'searchId',
            name: 'searchName',
            query: 'query',
            createdAt: '2020-01-01',
          },
        ],
        isSuccess: true,
      }));

      const { getByTitle } = renderer();
      const viewButton = getByTitle(/view/i);
      viewButton.click();
      expect(singletonRouter).toMatchObject({
        asPath: '/query',
      });
    });
  });
});
