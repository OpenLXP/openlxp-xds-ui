import { act, fireEvent, render, screen } from '@testing-library/react';
import SaveModal from '@/components/modals/SaveModal';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import * as xapi from '@/utils/xapi';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateUserList } from '@/hooks/useCreateUserList';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists.js';
import userListData from '@/__mocks__/data/userLists.data';

jest.mock('@/hooks/useUpdateUserList', () => ({
  useUpdateUserList: jest.fn(),
}));

jest.mock('@/hooks/useCreateUserList', () => ({
  useCreateUserList: jest.fn(),
}));

jest.mock('@/hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

// mocking the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

const mutateFn = jest.fn();

const createMutateFn = jest.fn();

const renderer = (isAuth = false) => {
  // // defaults user to logged in
  if (!isAuth) {
    useAuth.mockReturnValue({
      user: null,
    });
  } else {
    useAuth.mockReturnValue({
      user: {
        user: {
          id: '1',
          username: 'test',
          email: '',
        },
      },
    });
  }

  return render(
    <QueryClientWrapper>
      <div>
        <SaveModal courseId={'12345'} title={'test'} modalState={true} />
      </div>
    </QueryClientWrapper>
  );
};

beforeEach(() => {
  useUpdateUserList.mockImplementation(() => ({
    mutate: mutateFn,
  }));

  useCreateUserList.mockImplementation(() => ({
    mutate: createMutateFn,
    isSuccess: true,
  }));

  useUserOwnedLists.mockImplementation(() => ({
    data: userListData,
    isSuccess: true,
  }));
});

describe('Save Modal', () => {
  describe('static content', () => {
    it('should have a button id', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });
      expect(getByText(/add "test" to lists/i).id).not.toBeNull();
    });
    it('should render the title', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });
      expect(getByText(/add "test" to lists/i)).toBeInTheDocument();
    });
  });
  describe('with list data', () => {
    it('should render the remove button', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByText(/remove/i)).toBeInTheDocument();
    });
    it('should render the add button', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByText(/add/i)).toBeInTheDocument();
    });

    it('should call mutate on click of remove', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      act(() => {
        fireEvent.click(getByText(/remove/i));
      });

      expect(mutateFn).toHaveBeenCalled();
    });
    it('should call mutate on click of add', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      act(() => {
        fireEvent.click(getByText(/add/i));
      });

      expect(mutateFn).toHaveBeenCalled();
    });
  });
  describe('create new list', () => {
    it.todo('should render input fields for name and description');

    it.skip('should send xAPI statement when create is clicked', () => {
      const { getByText, getByPlaceholderText } = renderer(true);

      const spy = jest
        .spyOn(xapi, 'sendStatement')
        .mockImplementation(() => Promise.resolve({}));

      act(() => {
        fireEvent.click(getByText(/save/i));
      });

      expect(getByText('Create a new list')).toBeInTheDocument();

      const nameInput = getByPlaceholderText(/Name/i);
      const descInput = getByPlaceholderText(/List Description.../i);

      // TODO: Only one of these can be set, the other will not work
      // probably some kind of react update weirdness
      // consider using userEvent here
      act(() => {
        fireEvent.change(nameInput, {
          target: { value: 'Test List Name' },
        });
      });

      expect(nameInput).toHaveValue('Test List Name');

      act(() => {
        fireEvent.change(getByPlaceholderText(/List Description.../i), {
          target: { value: 'Test List Description' },
        });
      });

      expect(getByText('Test List Description')).toBeInTheDocument();

      fireEvent.click(getByText(/create/i, { selector: 'input' }));

      expect(getByText('Test List Name')).toBeInTheDocument();

      // xapi statement issued
      expect(spy).toHaveBeenCalled();
    });
  });
});
