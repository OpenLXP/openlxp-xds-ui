import { render, act, screen, fireEvent } from '@testing-library/react';
import singletonRouter from 'next/router'
import { useAuth } from '../../contexts/AuthContext';
import { useSearchUrl } from '../../hooks/useSearchUrl';
import { useConfig } from '../../hooks/useConfig';
import { useSearch } from '../../hooks/useSearch';
import { useMoreCoursesLikeThis } from '../../hooks/useMoreCoursesLikeThis';
import Search from '../../pages/search';
import courseData from '../../__mocks__/data/course.data';
import aggregationsData from '../../__mocks__/data/aggregations.data';

import mockRouter from 'next-router-mock';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../hooks/useSearchUrl', () => ({
  useSearchUrl: jest.fn(),
}));
jest.mock('../../hooks/useConfig', () => ({
  useConfig: jest.fn(),
}));
jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn(),
}));
jest.mock('../../hooks/useMoreCoursesLikeThis', () => ({
  useMoreCoursesLikeThis: jest.fn(),
}));
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const renderer = (child) => {
  return render(<QueryClientWrapper>{child}</QueryClientWrapper>);
};

describe('Search Page', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/search?');
    useSearchUrl.mockImplementation(() => ({ url: 'test.url' }));
    useSearch.mockImplementation(() => ({
      refetch: jest.fn(),
    }));
    useConfig.mockImplementation(() => ({
      data: { search_results_per_page: 10 },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('static content', () => {
    it('should render the search bar with keyword', () => {
      // mocking the logged out user
      useAuth.mockImplementation(() => ({
        user: null,
      }));
      const { getByPlaceholderText, getByText } = renderer(
        <Search query={{ keyword: 'test' }} />
      );
      expect(getByPlaceholderText(/search the catalog/i).value).toBe('test');
    });

    describe('with user', () => {
      it('should render the save search', () => {
        // mocking the logged in user
        useAuth.mockImplementation(() => ({
          user: { user: { email: 'test@example.com' } },
        }));
        const { getByText } = renderer(<Search query={{ keyword: 'test' }} />);
        expect(getByText(/save this search/i)).toBeInTheDocument();
      });
    });
  });

  describe('with data', () => {
    beforeEach(() => {
      useSearch.mockImplementation(() => ({
        data: {
          hits: [courseData],
          aggregations: aggregationsData,
          total: 1,
        },
        refetch: jest.fn(),
      }));
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: [],
        isLoading: true,
      }));
    });

    it('should show the number of results', () => {
      // no user
      useAuth.mockImplementation(() => ({
        user: null,
      }));

      const { getByText } = renderer(<Search query={{ keyword: '' }} />);
      expect(getByText(/About 1 results/)).toBeInTheDocument();
    });

    it('should show select dropdowns', () => {
      // no user
      useAuth.mockImplementation(() => ({
        user: null,
      }));
      const { getByText } = renderer(<Search query={{ keyword: '' }} />);

      expect(getByText(/course type/i)).toBeInTheDocument();
    });

    it('should show result(s)', () => {
      // no user
      useAuth.mockImplementation(() => ({
        user: null,
      }));

      const { getByText } = renderer(<Search query={{ keyword: '' }} />);

      expect(getByText(/test course title/i)).toBeInTheDocument();

      expect(getByText(/short description/i)).toBeInTheDocument();
    });

    describe('with user', () => {
      it('should show result(s) with save button', () => {
        // no user
        useAuth.mockImplementation(() => ({
          user: { user: { token: '' } },
        }));

        const { getByTitle } = renderer(<Search query={{ keyword: '' }} />);
        getByTitle('save course');
      });
    });
  });

  describe('more like this', () => {
    describe('with data', () => {
      beforeEach(() => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: aggregationsData,
            total: 1,
          },
          refetch: jest.fn(),
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData],
            total: 1,
          },
          isLoading: false,
        }));
      });
      it('should not show if total < 1', () => {
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [],
            total: 1,
          },
          isLoading: false,
        }));
        // no user
        useAuth.mockImplementation(() => ({
          user: null,
        }));
        const { queryByText } = renderer(<Search query={{ keyword: '' }} />);
        expect(queryByText(/test course title/i)).not.toBeInTheDocument();
        expect(queryByText(/short description/i)).not.toBeInTheDocument();
      });
      it('should show course data', () => {
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData],
            total: 1,
          },
          isLoading: false,
        }));
        // no user
        useAuth.mockImplementation(() => ({
          user: null,
        }));
        const { getByText } = renderer(<Search query={{ keyword: '' }} />);
        expect(getByText(/test course title/i)).toBeInTheDocument();
        expect(getByText(/short description/i)).toBeInTheDocument();
      });
      it('should show action buttons', () => {
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData],
            total: 1,
          },
          isLoading: false,
        }));
        // no user
        useAuth.mockImplementation(() => ({
          user: null,
        }));
        const { getByTitle, queryByTitle } = renderer(
          <Search query={{ keyword: '' }} />
        );
        expect(getByTitle('share course')).toBeInTheDocument();
        expect(getByTitle('view course')).toBeInTheDocument();
        expect(queryByTitle('save course')).not.toBeInTheDocument();
      });
      describe('with user', () => {
        it('should show save button', () => {
          useMoreCoursesLikeThis.mockImplementation(() => ({
            data: {
              hits: [courseData],
              total: 1,
            },
            isLoading: false,
          }));
          // user
          useAuth.mockImplementation(() => ({
            user: { user: { token: '' } },
          }));
          const { getByTitle } = renderer(<Search query={{ keyword: '' }} />);
          expect(getByTitle('save course')).toBeInTheDocument();
        });
      });
    });
  });

  describe('actions', () => {
    beforeEach(() => {
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: {
          hits: [],
          total: 1,
        },
        isLoading: false,
      }));
      useSearch.mockImplementation(() => ({
        data: {
          hits: [courseData],
          aggregations: aggregationsData,
          total: 1,
        },
        refetch: jest.fn(),
      }));
      // user
      useAuth.mockImplementation(() => ({
        user: { user: { token: '' } },
      }));
    });

    describe('selection dropdown', () => {
      it('should show selected dropdown', () => {
        const { getByText, queryByText } = renderer(
          <Search query={{ keyword: '' }} />
        );

        act(() => {
          const button = getByText(/course type/i);
          fireEvent.click(button);
        });
        act(() => {
          const selection = getByText(/test bucket 1/i);
          fireEvent.click(selection);
        });

        expect( queryByText( /course type/i ) ).not.toBeInTheDocument();

      });
      it('should clear selection from select dropdown', () => {
        const { getByText, queryByText, getAllByTitle } = renderer(
          <Search query={{ keyword: '' }} />
        );

        act(() => {
          const button = getByText(/course type/i);
          fireEvent.click(button);
        });
        act(() => {
          const selection = getByText(/test bucket 1/i);
          fireEvent.click(selection);
        });
        act(() => {
          const button = getAllByTitle(/clear selection/i)[0];
          fireEvent.click(button);
        });
        expect( queryByText( /course type/i ) ).toBeInTheDocument();
        expect(singletonRouter).toMatchObject(({asPath:'/search'}))
      });
    });
    
    describe('pagination', () => {
      it.todo('next updates the url of the page n+1');
      it.todo('back updates the url of the page n-1')
      it.todo('')
    });
  });
});
