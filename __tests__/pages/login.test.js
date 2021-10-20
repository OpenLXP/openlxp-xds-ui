import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from '../../pages/login';
import { AuthContextWrapper } from '../../__mocks__/authContextMock';

describe('Login Page', () => {
  it('should render the Login screen title, input fields, and buttons', () => {
    render(<Login />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByText(`Create an Account`)).toBeInTheDocument();
    expect(screen.getByText(`Forgot Password`)).toBeInTheDocument();
    expect(screen.getByText(`Login`)).toBeInTheDocument();
    expect(screen.getByText(`or continue with`)).toBeInTheDocument();
    expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
  });

  describe('Actions', () => {
    beforeEach(() => {
      render(<Login />);
    });

    it('should change values on input: Username', () => {
      const input = screen.getByPlaceholderText('Username');

      act(() => {
        fireEvent.change(input, { target: { value: 'username' } });
      });

      expect(input.value).toBe('username');
    });
    it('should change values on input: Password', () => {
      const input = screen.getByPlaceholderText('Password');

      act(() => {
        fireEvent.change(input, { target: { value: 'username' } });
      });

      expect(input.value).toBe('username');
    });
    it('should change show error message for empty attributes', () => {
      const input = screen.getByPlaceholderText('Password');

      act(() => {
        fireEvent.change(input, { target: { value: '' } });
      });

      act(() => {
        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });

      expect(screen.getByText(/All fields required/i)).toBeInTheDocument();
    });
    it('should change show error message for valid email', () => {
      const username = screen.getByPlaceholderText('Username');
      const password = screen.getByPlaceholderText('Password');

      act(() => {
        fireEvent.change(username, { target: { value: 'username' } });
        fireEvent.change(password, { target: { value: 'password' } });
      });

      act(() => {
        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });

      expect(screen.getByText(/Username must be an email/i))
    } );

    it.todo('should log a user in.')
  });
});
