import { QueryClient, QueryClientProvider } from 'react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserList } from '@/hooks/useUserList';
import EditList from '@/pages/lists/edit/[listId]';
import singletonRouter from 'next/router';

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

useUpdateUserList.mockImplementation(() => ({
  mutate: jest.fn(),
}));

useUserList.mockImplementation(() => ({
  data: {
    id: 1,
    name: 'test name',
    description: 'test description',
    public: true,
    experiences: [],
  },
  isSuccess: true,
}));

beforeEach(() => {
  // clear all mocks
  jest.clearAllMocks();
});

describe('Edit List', () => {
  it('should render the page', () => {
    renderer(<EditList />);
    screen.getByText('View public list');
  });

  it('should render the data from the list', () => {
    renderer(<EditList listId={1} />);
    const title = screen.getByPlaceholderText('List Name');
    const description = screen.getByPlaceholderText('List Description');
    expect(title.value).toBe('test name');
    expect(description.value).toBe('test description');
  });

  it('should navigate to the public list page', () => {
    renderer(<EditList listId={1} />);
    const publicList = screen.getByText('View public list');
    act(() => {
      fireEvent.click(publicList);
    });
    expect(singletonRouter).toMatchObject({ asPath: '/lists/1' });
  });

  it('should start the visibility toggle as private', () => {
    useUserList.mockImplementation(() => ({
      data: {
        id: 1,
        name: 'test name',
        description: 'test description',
        public: false,
        experiences: [],
      },
      isSuccess: true,
    }));
    renderer(<EditList />);
    const toggle = screen.getByText('Private List, only you can see it.');

    expect(toggle).toBeInTheDocument();
  });

  it('should update the visibility toggle to private when clicked', () => {
    useUserList.mockImplementation(() => ({
      data: {
        id: 1,
        name: 'test name',
        description: 'test description',
        public: false,
        experiences: [],
      },
      isSuccess: true,
    }));
    renderer(<EditList listId={1} />);
    const toggle = screen.getByTitle('toggle');
    act(() => {
      fireEvent.click(toggle);
    });
    expect(
      screen.getByText('Public list, viewable by other users.')
    ).toBeInTheDocument();
  });

  it('should remove course when "remove" is clicked', () => {
    useUserList.mockImplementation(() => ({
      data: {
        id: 1,
        name: 'test name',
        description: 'test description',
        public: false,
        experiences: [
          {
            Course: {
              CourseTitle: 'Test Title',
              CourseProviderName: 'Course Provider Name',
            },
            meta: {
              id: '1',
              metadata_key_hash: '1',
            },
          },
        ],
      },
      isSuccess: true,
    }));
    renderer(<EditList />);

    const remove = screen.getByRole('button', { name: 'Remove' });
    act(() => {
      fireEvent.click(remove);
    });

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('should call the api when save is clicked', () => {
    renderer(<EditList />);
    const save = screen.getByRole('button', { name: 'Save' });
    act(() => {
      fireEvent.click(save);
    });
    expect(useUpdateUserList).toHaveBeenCalled();
  });
});
