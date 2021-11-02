import { render } from '@testing-library/react';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Owned from 'pages/lists/owned';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserOwnedLists } from '../../../hooks/useUserOwnedLists';
import userListData from '../../../__mocks__/data/userLists.data';

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../hooks/useUserOwnedLists', () => ({
  useUserOwnedLists: jest.fn(),
}));

const renderer = () => {
  useAuth.mockImplementation(() => ({
    user: { user: { token: 'token' } },
  }));

  return render(
    <MemoryRouterProvider>
      <QueryClientWrapper>
        <Owned />
      </QueryClientWrapper>
    </MemoryRouterProvider>
  );
};

describe('User Owned Lists', () => {
  describe('without data', () => {
    it('should render title', () => {
      useUserOwnedLists.mockImplementation(() => ({
        data: [],
        isSuccess: false,
      }));

      const { getByText } = renderer();

      expect(getByText(/my lists/i)).toBeInTheDocument();
    });
  });
  describe('with data', () => {
    beforeAll(() => {
      useUserOwnedLists.mockImplementation(() => ({
        data: userListData,
        isSuccess: true,
      }));
    });
    it('should render list with title', () => {
      const { getByText } = renderer();
      expect(getByText(/test title 1/i)).toBeInTheDocument();
    });
    it('should render list with total subscribers', () => {
      const { getByText } = renderer();
      expect(getByText(/0/i)).toBeInTheDocument();
    });
    it('should render list with total courses', () => {
      const { getByText } = renderer();
      expect(getByText(/2/i)).toBeInTheDocument();
    });
    it('should render edit button', () => {
      const { getByText } = renderer();
      expect(getByText(/Edit/i)).toBeInTheDocument();
    });
    it('should render view button', () => {
      const { getByText } = renderer();
      expect(getByText(/View/i)).toBeInTheDocument();
    });
  });
});
