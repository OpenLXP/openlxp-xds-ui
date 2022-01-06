import { act, screen, render, fireEvent } from '@testing-library/react';
import SaveModal from '@/components/modals/SaveModal';

import userListData from '@/__mocks__/data/userLists.data';
import { useUserOwnedLists } from '@/hooks/useUserOwnedLists.js';
import { useUpdateUserList } from '@/hooks/useUpdateUserList';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';

jest.mock('@/hooks/useUpdateUserList', () => ({
  useUpdateUserList: jest.fn(),
}));

jest.mock('@/hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

const mutateFn = jest.fn();

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <div>
        <SaveModal courseId={'12345'} modalState={true} />
      </div>
    </QueryClientWrapper>
  );
};

beforeEach(() => {
  useUpdateUserList.mockImplementation(() => ({
    mutate: mutateFn,
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
      expect(getByText(/add course to lists/i).id).not.toBeNull();
    });
    it('should render the title', () => {
      const { getByText } = renderer();
      act(() => {
        fireEvent.click(getByText(/save/i));
      });
      expect(getByText(/add course to lists/i)).toBeInTheDocument();
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
    it.todo('should');
  });
});
