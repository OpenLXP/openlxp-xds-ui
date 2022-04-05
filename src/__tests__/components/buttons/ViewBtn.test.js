import { act, screen, render, fireEvent } from '@testing-library/react';
import ViewBtn from "../../../components/buttons/ViewBtn";
import xAPIMapper from "@/utils/xapi/xAPIMapper";
import courseData from '@/__mocks__/data/course.data';
import { useAuth } from '@/contexts/AuthContext';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

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
      <ViewBtn id={data.meta.id} courseTitle={data.courseTitle} courseDescription={data.courseDescription} />
    </MemoryRouterProvider>
  );
};

describe('ShareBtn', () => {
  it('has an id', () => {
    const { getByRole } = renderer();

    expect(getByRole('button').id).not.toBeNull();
  });

  it('send xAPI statement when course is clicked', () => {
    const { getByRole } = renderer();

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

    fireEvent.click(getByRole('button'));

    expect(spy).toHaveBeenCalled();
  })
});
