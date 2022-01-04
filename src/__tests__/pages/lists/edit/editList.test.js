import { render, act, fireEvent } from '@testing-library/react';
import { useUserList } from '@/hooks/useUserList';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import EditList from '@/pages/lists/edit/[listId]';
import mockRouter from 'next-router-mock';
import { QueryClientProvider, QueryClient } from 'react-query';
import courseData from '@/__mocks__/data/course.data';

// mocking router
jest.mock('next/dist/client/router', () => require('next-router-mock'));
// mocking user lists
jest.mock('@/hooks/useUserList', () => ({
  useUserList: jest.fn(),
}));
// mocking mutation
jest.mock('@/hooks/useUpdateUserList', () => ({
  useUpdateUserList: jest.fn(),
}));

const queryClient = new QueryClient();
const renderer = (component) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe('Edit List', () => {
  describe('static', () => {
    //
    beforeEach(() => {
      // default data
      mockRouter.setCurrentUrl('/');
      useUserList.mockImplementation(() => ({
        data: {
          name: 'test name',
        },
      }));
      // default
      useUpdateUserList.mockImplementation(() => ({
        mutate: jest.fn(),
      }));
    });

    it('should render the list name', () => {
      const { getByRole } = renderer(<EditList />);
      expect(getByRole('heading', { name: /test name/i })).toBeInTheDocument();
    });

    it('should render update button', () => {
      const { getByRole } = renderer(<EditList />);
      expect(getByRole('button', { name: /update/i })).toBeInTheDocument();
    });

    it('should render cancel button', () => {
      const { getByRole } = renderer(<EditList />);
      expect(getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });
  });
  describe('inputs', () => {
    //
    beforeEach(() => {
      // default data
      mockRouter.setCurrentUrl('/');
      useUserList.mockImplementation(() => ({
        data: {
          name: 'test name',
          description: 'test description',
        },
      }));
      // default
      useUpdateUserList.mockImplementation(() => ({
        mutate: jest.fn(),
      }));
    });

    it('should render input for title', () => {
      const { getByPlaceholderText } = renderer(<EditList />);

      expect(getByPlaceholderText(/list name/i)).toBeInTheDocument();
    });

    it('should render input for description', () => {
      const { getByPlaceholderText } = renderer(<EditList />);

      expect(getByPlaceholderText(/list description.../i)).toBeInTheDocument();
    });

    it('should render counter for description length', () => {
      const { getByText } = renderer(<EditList />);

      expect(getByText('/200')).toBeInTheDocument();
    });
  });
  describe('table', () => {
    //
    beforeEach(() => {
      // default data
      mockRouter.setCurrentUrl('/');
      useUserList.mockImplementation(() => ({
        data: {
          name: 'test name',
          description: 'test description',
          experiences: [courseData],
        },
        isSuccess: true,
      }));
      // default
      useUpdateUserList.mockImplementation(() => ({
        mutate: jest.fn(),
      }));
    });
    it('should render list headers', () => {
      const { getByText } = renderer(<EditList />);

      expect(getByText('Course Title')).toBeInTheDocument();
      expect(getByText(/course provider/i)).toBeInTheDocument();
      fireEvent.click(getByText('Remove'));

    });
    it('should render course title', () => {
      const { getByText } = renderer(<EditList />);

      expect(getByText(courseData.Course.CourseTitle)).toBeInTheDocument();
      expect(
        getByText(courseData.Course.CourseProviderName)
      ).toBeInTheDocument();
    });
    it('should render remove button', () => {
      const { getByRole } = renderer(<EditList />);
      expect(getByRole('button', { name: /remove/i })).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    //
    beforeEach(() => {
      // default data
      mockRouter.setCurrentUrl('/');
      useUserList.mockImplementation(() => ({
        data: {
          name: 'test name',
          description: 'test description',
          experiences: [courseData],
        },
        isSuccess: true,
      }));
      // default
      useUpdateUserList.mockImplementation(() => ({
        mutation: { mutate: jest.fn() },
      }));
    });
    it.skip('should call mutation on click of update', () => {
      const { getByText } = renderer(<EditList />);
      act(() => {
        const button = getByText(/update/i);

        fireEvent.click(button);
      });
      expect(useUpdateUserList).toHaveBeenCalled();
    });
    it('should reset inputs on clear', () => {
      const { getByPlaceholderText, getByText } = renderer(<EditList />);

      const input = getByPlaceholderText('List Description...');
      act(() => {
        fireEvent.change(input, { target: { value: 'new' } });
      });
      expect( input.value ).toBe( 'new' );
      act( () => {
        const button = getByText('Cancel')
        fireEvent.click(button)
      })
      expect( input.value ).toBe( 'test description' );
    });
  });
});
