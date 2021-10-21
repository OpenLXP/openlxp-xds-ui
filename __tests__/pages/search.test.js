import { render, act, screen, fireEvent } from '@testing-library/react';

import { useAuth } from '../../contexts/AuthContext';
import { useSearchUrl } from '../../hooks/useSearchUrl';
import searchData from '../../__mocks__/data/search.data';
import { useConfig } from '../../hooks/useConfig';
import { useSearch } from '../../hooks/useSearch';
import Search from '../../pages/search';
import courseData from '../../__mocks__/data/course.data';
import aggregationsData from '../../__mocks__/data/aggregations.data';

jest.mock('../../hooks/useSearchUrl', () => ({
  useSearchUrl: jest.fn(),
}));
jest.mock('../../hooks/useConfig', () => ({
  useConfig: jest.fn(),
}));
jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn(),
}));
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Search Page', () => {
  beforeEach(() => {
    useConfig.mockImplementation(() => ({
      data: { search_results_per_page: 10 },
    }));
    useSearchUrl.mockImplementation(() => ({ url: 'test.url' }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('static content', () => {
    it('should render search bar with keyword', () => {
      useAuth.mockImplementation(() => ({ user: null }));
      useSearch.mockImplementation(() => ({ refetch: jest.fn() }));
      render(<Search query={{ keyword: 'test' }} />);

      expect(screen.getByPlaceholderText(/search the catalog/i).value).toBe(
        'test'
      );
    });
  });

  describe('with user', () => {
    it('should show save this search', () => {
      useAuth.mockImplementation(() => ({
        user: { user: { email: 'value' } },
      }));
      useSearch.mockImplementation(() => ({
        refetch: jest.fn(),
      }));
      const { getByText } = render(
        <Search query={{ keyword: 'test query' }} />
      );

      expect(getByText(/save this search/i)).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    it('should render results', () => {
      useAuth.mockImplementation(() => ({
        user: { user: { email: 'value' } },
      }));
      useSearch.mockImplementation(() => ({
        data: {
          hits: [courseData],
          aggregations: [aggregationsData],
        },
        refetch: jest.fn(),
      }));
      const { getByText } = render(
        <Search query={{ keyword: 'test query' }} />
      );

      expect(getByText(/test course title/i)).toBeInTheDocument();
      expect(getByText(/short description/i)).toBeInTheDocument();
    });

    it('should render select lists', () => {
      useAuth.mockImplementation(() => ({
        user: { user: { email: 'value' } },
      }));
      useSearch.mockImplementation(() => ({
        data: {
          hits: [courseData],
          aggregations: aggregationsData,
        },
        refetch: jest.fn(),
      }));
      const { getByText } = render(
        <Search query={{ keyword: 'test query' }} />
      );
      expect(getByText(/course type/i)).toBeInTheDocument();
    });
  });
});
