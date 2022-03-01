import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider/MemoryRouterProvider-11.1';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useSearch } from '@/hooks/useSearch';
import { useSearchUrl } from '@/hooks/useSearchUrl';
import Search from '@/pages/search';
import aggregationsData from '@/__mocks__/data/aggregations.data';
import courseData from '@/__mocks__/data/course.data';
import singletonRouter from 'next/router';
import uiConfigData from '@/__mocks__/data/uiConfig.data';
import xAPIMapper from "@/utils/xapi/xAPIMapper";

jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('@/hooks/useSearchUrl', () => ({
  useSearchUrl: jest.fn()
}));
jest.mock('../../hooks/useConfig', () => ({
  useConfig: jest.fn()
}));
jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn()
}));
jest.mock('../../hooks/useMoreCoursesLikeThis', () => ({
  useMoreCoursesLikeThis: jest.fn()
}));
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// mocking the jest fn
console.log = jest.fn();

const renderer = (isAuth) => {
  isAuth
    ? useAuth.mockImplementation(() => ({
      user: { user: { token: 'token' } }
    }))
    : useAuth.mockImplementation(() => ({
      user: null
    }));

  useSearchUrl.mockImplementation(() => ({
    url: 'fake url',
    setUrl: jest.fn()
  }));

  useConfig.mockImplementation(() => ({
    data: uiConfigData
  }));

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Search
          query={{
            keyword: 'test',
            p: 1
          }}
        />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Search Page', () => {
  describe('without user', () => {
    describe('save this search', () => {
      it('should not show save this search button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: []
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));
        const { queryByText } = renderer(false);
        expect(queryByText(/save this search/i)).not.toBeInTheDocument();
      });
    });

    describe('search bar', () => {
      it('should show initial value', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: []
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByPlaceholderText } = renderer(false);
        expect(getByPlaceholderText(/search the catalog/i).value).toBe('');
      });
      it('should change value on change', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: []
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByPlaceholderText } = renderer(false);

        const input = getByPlaceholderText(/search the catalog/i);

        act(() => {
          fireEvent.change(input, { target: { value: 'updated' } });
        });

        expect(input.value).toBe('updated');
      });
      it('should reset value when reset is clicked', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: []
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByPlaceholderText, getByTitle } = renderer(false);

        const input = getByPlaceholderText(/search the catalog/i);
        const resetBtn = getByTitle(/reset/i);
        act(() => {
          fireEvent.click(resetBtn);
        });

        expect(input.value).toBe('');
      });
      it('should change url on search', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: []
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByPlaceholderText, getByTitle } = renderer(false);

        const input = getByPlaceholderText(/search the catalog/i);
        const searchBtn = getByTitle(/search/i);

        act(() => {
          fireEvent.change(input, { target: { value: 'updated' } });
        });

        act(() => {
          fireEvent.click(searchBtn);
        });

        expect(singletonRouter).toMatchObject({
          asPath: '/search?keyword=updated&p=1'
        });
      });
    });

    describe('select filters', () => {
      it('should show default value', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: aggregationsData
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/course type/i)).toBeInTheDocument();
        expect(getByText(/provider/i)).toBeInTheDocument();
      });
      it('should show options when clicked', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: aggregationsData
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        act(() => {
          fireEvent.click(getByText(/course type/i));
        });

        expect(getByText(/test bucket 1/i)).toBeInTheDocument();
      });
      it('should show selected value when selected and clear', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: aggregationsData
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText, queryByText, getAllByText } = renderer(false);

        act(() => {
          fireEvent.click(getByText(/course type/i));
        });

        act(() => {
          fireEvent.click(getByText(/test bucket 1/i));
        });
        expect(queryByText(/course type/i)).not.toBeInTheDocument();
        act(() => {
          fireEvent.click(getAllByText(/clear/i)[0]);
        });
        expect(queryByText(/course type/i)).toBeInTheDocument();
        expect(singletonRouter).toMatchObject({
          asPath: '/search?keyword=updated&p=1' 
        });
      });
    });

    describe('search result', () => {
      it('should show the number of results', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/about 1 result/i)).toBeInTheDocument();
      });
      it('should show the result title', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/test course title/i)).toBeInTheDocument();
      });

      it('should show the result description', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/short description/i)).toBeInTheDocument();
      });

      it('should show the result provider', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/provider name/i)).toBeInTheDocument();
      });

      it('should show the view button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByTitle } = renderer(false);

        expect(getByTitle(/view course/i)).toBeInTheDocument();
        expect(getByTitle(/view course/i).id).not.toBeUndefined();
      });
      it.skip('should show the share button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByTitle } = renderer(false);

        expect(getByTitle(/share course/i)).toBeInTheDocument();
        expect(getByTitle(/share course/i).id).not.toBeUndefined();
      });

      it('should not show the save button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { queryByTitle } = renderer(false);

        expect(queryByTitle(/save course/i)).not.toBeInTheDocument();
      });
    });

    describe('pagination', () => {
      it('should show the next button if more pages are available', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);
        expect(getByText(/next/i)).toBeInTheDocument();
      });
      it('should not show the next button if there are no more pages', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 1
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { queryByText } = renderer(false);
        expect(
          queryByText(/next/i).className.includes('invisible')
        ).toBeTruthy();
      });
      it('should show the previous button if more pages are available', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { getByText } = renderer(false);

        act(() => {
          fireEvent.click(getByText(/next/i));
        });

        expect(getByText(/previous/i)).toBeInTheDocument();
      });
      it('should not show the Previous button if there are no more pages.', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [] }
        }));

        const { queryByText } = renderer(false);

        expect(
          queryByText(/previous/i).className.includes('block')
        ).toBeTruthy();
      });
    });

    describe('more like this', () => {
      it('should show title of a related course', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/test course title/i)).toBeInTheDocument();
      });
      it('should show description of a related course', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/short description/i)).toBeInTheDocument();
      });
      it('should show the details of a related course', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByText } = renderer(false);

        expect(getByText(/1234/i)).toBeInTheDocument();
        expect(getByText(/provider name/i)).toBeInTheDocument();
        expect(getByText(/course type 1/i)).toBeInTheDocument();
      });
      it.skip('should show the share button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByTitle } = renderer(false);

        expect(getByTitle(/share course/i)).toBeInTheDocument();
      });
      it('should show the view button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByTitle } = renderer(false);

        expect(getByTitle(/view course/i)).toBeInTheDocument();
      });
      it('should not show the save button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { queryByText } = renderer(false);

        expect(queryByText(/save course/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('with user', () => {
    describe('save this search', () => {
      it('should show save this search button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: []
          }
        }));

        const { getByText } = renderer(true);

        expect(getByText(/save this search/i)).toBeInTheDocument();
      });
      it('should show modal for saving search', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: []
          }
        }));

        const { getByText, getByRole } = renderer(true);

        act(() => {
          const button = getByText(/save this search/i);
          fireEvent.click(button);
        });

        expect(getByText('Save')).toBeInTheDocument();
      });
    });

    describe('search results', () => {
      it('should show save button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: []
          }
        }));

        const { getByTitle } = renderer(true);

        expect(getByTitle(/save course/i)).toBeInTheDocument();
      });
      it.skip('should show save modal when clicked', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [courseData],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: []
          }
        }));

        const { getByText, getByRole } = renderer(true);
      });
    });
    describe('more like this', () => {
      it('should show save button', () => {
        useSearch.mockImplementation(() => ({
          data: {
            hits: [],
            aggregations: [],
            total: 100
          },
          refetch: jest.fn()
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: {
            hits: [courseData]
          }
        }));

        const { getByTitle } = renderer(true);

        expect(getByTitle(/save course/i)).toBeInTheDocument();
      });
      it.todo('should show save modal when clicked');
    });
  });
  describe('xAPI', () => {
    it('should send xAPI Statement', () => {

      const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      const { getByRole, getByTitle } = renderer(true);
      act(() => {
        fireEvent.change(getByRole('textbox'), {
          target: { value: 'data' },
        });
      });
      act(() => {
        fireEvent.click(getByTitle(/search/i));
      });

      expect(spy).toHaveBeenCalled();

    });
  });
});
