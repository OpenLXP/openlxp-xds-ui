import { fireEvent, render } from '@testing-library/react';

// imports for mocking
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Course from 'pages/course/[courseId]';
import { useAuth } from '../../../contexts/AuthContext';
import { useCourse } from 'hooks/useCourse';
import courseData from '../../../__mocks__/data/course.data';
import configData from '../../../__mocks__/data/uiConfig.data';
import { useMoreCoursesLikeThis } from 'hooks/useMoreCoursesLikeThis';
import { useConfig } from 'hooks/useConfig';
import singletonRouter from 'next/router';

// mocking the router
jest.mock('next/dist/client/router', () => require('next-router-mock'));
// mocking config
jest.mock('../../../hooks/useConfig', () => ({
  useConfig: jest.fn(),
}));
jest.mock('../../../hooks/useCourse', () => ({
  useCourse: jest.fn(),
}));
jest.mock('../../../hooks/useMoreCoursesLikeThis', () => ({
  useMoreCoursesLikeThis: jest.fn(),
}));

// mock useAuth
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

const renderer = (isAuth = false) => {
  if (isAuth) {
    useAuth.mockImplementation(() => ({
      user: {
        user: {
          id: '1',
          email: '',
        },
      },
    }));
  } else {
    useAuth.mockImplementation(() => ({
      user: null,
    }));
  }

  // mocking the config
  useConfig.mockImplementation(() => ({
    data: configData,
    isSuccess: true,
  }));

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Course />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('Course Page', () => {
  describe('with out user', () => {
    it('should show the course title', () => {
      // mock course data
      useCourse.mockImplementation(() => ({
        data: courseData,
        isSuccess: true,
      }));
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: [],
      }));

      // render the component
      const { getByText } = renderer();

      // assert
      expect(getByText(courseData.Course.CourseTitle)).toBeInTheDocument();
      expect(
        getByText(courseData.Course.CourseShortDescription)
      ).toBeInTheDocument();
      expect(getByText(courseData.Course.CourseCode)).toBeInTheDocument();
    });

    describe('external link', () => {
      it('should show the course external link', () => {
        // mock course data
        useCourse.mockImplementation(() => ({
          data: courseData,
          isSuccess: true,
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: [],
        }));

        // render the component
        const { getByTitle } = renderer();

        // assert
        expect(getByTitle(/view course/i)).toBeInTheDocument();
      });
    });

    describe('share link', () => {
      it('should show the share button', () => {
        // mock course data
        useCourse.mockImplementation(() => ({
          data: courseData,
          isSuccess: true,
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: [],
        }));

        // render the component
        const { getByTitle } = renderer();

        // assert
        expect(getByTitle(/share course/i)).toBeInTheDocument();
      });
    });

    describe('with moreLikeThis data', () => {
      it('should show the moreLikeThis section', () => {
        // mock course data
        useCourse.mockImplementation(() => ({
          data: courseData,
          isSuccess: false,
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [courseData] },
          isSuccess: true,
        }));

        // render the component
        const { getByText } = renderer();

        // assert
        expect(getByText(/test course/i)).toBeInTheDocument();
      });
      it('should navigate to new course page when card is clicked', () => {
        // mock course data
        useCourse.mockImplementation(() => ({
          data: courseData,
          isSuccess: false,
        }));
        useMoreCoursesLikeThis.mockImplementation(() => ({
          data: { hits: [courseData] },
          isSuccess: true,
        }));

        // render the component
        const { getByText } = renderer();

        // assert
        const button = getByText(/test course/i);
        button.click();
        expect(singletonRouter).toMatchObject({
          asPath: '/course/' + courseData.meta.metadata_key_hash,
        });
      });
    });
  });
  describe('with user', () => {
    it('should show the save course modal', () => {
      // mock course data
      useCourse.mockImplementation(() => ({
        data: courseData,
        isSuccess: true,
      }));
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: [],
      }));

      // render the component
      const { getByTitle, getByText } = renderer(true);

      // assert
      expect(getByTitle(/save course/i)).toBeInTheDocument();
    });
  });
});
