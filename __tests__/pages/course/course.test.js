import { render, act, fireEvent } from '@testing-library/react';

// imports for mocking
import { useConfig } from '../../../hooks/useConfig';
import { useCourse } from '../../../hooks/useCourse';
import { useMoreCoursesLikeThis } from '../../../hooks/useMoreCoursesLikeThis';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import uiConfigData from '../../../__mocks__/data/uiConfig.data';
import courseData from '../../../__mocks__/data/course.data';
import { QueryClient, QueryClientProvider } from 'react-query';
import Course from '../../../pages/course/[courseId]';
import singletonRouter, { useRouter } from 'next/router';

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

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <MemoryRouterProvider url='/' onPush={singletonRouter.push('/test')}>
      <QueryClientProvider client={queryClient}>
        <Course />
      </QueryClientProvider>
    </MemoryRouterProvider>
  );
};

describe('Course Page', () => {
  describe('with config & data', () => {
    // before
    beforeEach(() => {
      useConfig.mockImplementation(() => ({
        data: uiConfigData,
        isSuccess: true,
      }));
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: {},
      }));
      useCourse.mockImplementation(() => ({
        data: courseData,
        isSuccess: true,
      }));
    });

    it('should render course title', () => {
      const { getByText } = renderer();
      expect(getByText(courseData.Course.CourseTitle)).toBeInTheDocument();
    });
    it('should render a description', () => {
      const { getByText } = renderer();
      expect(
        getByText(courseData.Course.CourseShortDescription)
      ).toBeInTheDocument();
    });
    it('should render a details section', () => {
      const { getByText } = renderer();
      expect(getByText(courseData.Course.CourseCode)).toBeInTheDocument();
    });
  });
  describe('more like this', () => {
    it.todo('should render more like this courses');
  });

  describe('actions', () => {
    // before
    beforeEach(() => {
      mockRouter.setCurrentUrl('/');
      useConfig.mockImplementation(() => ({
        data: uiConfigData,
        isSuccess: true,
      }));
      useMoreCoursesLikeThis.mockImplementation(() => ({
        data: {},
      }));
      useCourse.mockImplementation(() => ({
        data: courseData,
        isSuccess: true,
      }));
    });
    it('should push to new location', () => {
      const { getByText } = renderer();
      act(() => {
        const button = getByText(courseData.Course.CourseTitle);
        fireEvent.click(button);
      } );
      expect(singletonRouter).toMatchObject({ asPath: '/test' });
    });
    it.todo('should render save button');
    it.todo('should render share button');
  });
});
