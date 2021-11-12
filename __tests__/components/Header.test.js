import { render, act } from '@testing-library/react';
import singletonRouter, { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import mockRouter from 'next-router-mock';
import Header from '../../components/Header';

//mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

// This is all you need:
describe('Header', () => {
  describe('without user', () => {
    useAuth.mockImplementation(() => ({
      user: null,
    }));
    it('shows home button', async () => {
      const { getByText, getByRole } = render(<Header />);
      expect(getByText(/home/i)).toBeInTheDocument();
      expect(
        getByText(/home/i).className.includes('font-semibold')
      ).toBeTruthy();
    });
    it('shows sign in', () => {
      const { getByText, getByRole } = render(<Header />);
      expect(getByText(/sign in/i));
    });
    it('shows sign up', () => {
      const { getByText } = render(<Header />);
      expect(getByText(/sign up/i));
    });
    it('shows home navigator', () => {
      const { getByTitle } = render(<Header />);
      expect(getByTitle(/home/i)).toBeInTheDocument();
    });
  });
  describe('with user', () => {
    it('shows user menu button', () => {
      useAuth.mockImplementation(() => {
        return {
          user: { user: { email: 'test@email.com' } },
        };
      });

      const { getByText } = render(<Header />);

      expect(getByText('test@email.com')).toBeInTheDocument();
    });
  });
});
