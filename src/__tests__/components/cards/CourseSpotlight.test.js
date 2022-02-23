import { render, act, fireEvent } from '@testing-library/react';
import { useConfig } from '@/hooks/useConfig';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import courseData from '@/__mocks__/data/course.data';
import uiConfigData from '@/__mocks__/data/uiConfig.data';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import xAPIMapper from "@/utils/xapi/xAPIMapper";
import { useAuth } from '@/contexts/AuthContext';

// jest mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('@/hooks/useConfig', () => ({
  useConfig: jest.fn(),
}));

// mock auth
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const renderer = (data = courseData) => {
  useAuth.mockImplementation(() => {
    return {
      user: { user: { email: 'test@email.com' } },
    };
  });

  return render(
    <MemoryRouterProvider url='/'>
      <CourseSpotlight course={data} />
    </MemoryRouterProvider>
  );
};

beforeEach(() => {
  useConfig.mockImplementation(() => ({
    data: uiConfigData,
  }));
});

describe('Course Spotlight', () => {
  describe('with data', () => {
    it('should render the course title', () => {
      const { queryByText } = renderer();
      expect(queryByText(/test course title/i)).toBeInTheDocument();
    });

    it('should render the course provider name', () => {
      const { queryByText } = renderer();
      expect(queryByText(/provider name/i)).toBeInTheDocument();
    });

    describe('with course image', () => {
      it('should render the image', () => {
        const modified = {
          ...courseData,
          Technical_Information: { Thumbnail: 'fake' },
        };
        const { queryByRole } = renderer(modified);
        expect(queryByRole('img')).toBeInTheDocument();
      });
    });

    describe('without image', () => {
      it('should not render the image', () => {
        const { queryByRole } = renderer();
        expect(queryByRole('img')).not.toBeInTheDocument();
      });
    });
  });

  it('send xAPI statement when course is clicked', () => {
    const { container, getByText } = renderer();

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

      act(() => {
      fireEvent.click(getByText(/Test Course Title/i).parentElement);
    });

    expect(spy).toHaveBeenCalled();
  })
});

it('renders', () => {
  const {} = renderer();
});
