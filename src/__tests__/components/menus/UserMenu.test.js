import { render, act, fireEvent, screen } from '@testing-library/react';

import UserMenu from '../../../components/menus/UserMenu';
import { useAuth } from '../../../contexts/AuthContext';

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('User Menu', () => {
  describe('with user', () => {
    beforeEach(() => {
      useAuth.mockImplementation(() => ({
        user: { user: { email: 'value' } },
      }));
      render(<UserMenu />);
    });
    it('shows the users email', () => {
      expect(screen.getByText('value')).toBeInTheDocument();
    });
    it('shows user menu', () => {
      const button = screen.getByText(/value/i);

      act(() => {
        fireEvent.click(button);
      });

      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });
  });
});
