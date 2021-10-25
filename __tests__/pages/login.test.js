import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from '../../pages/login';
import { useAuth } from '../../contexts/AuthContext';
import MockAxios from 'jest-mock-axios';

import mockRouter from 'next-router-mock';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

beforeEach(() => {
  mockRouter.setCurrentUrl('/login');
});
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Page', () => {
  it('should render the Login screen title, input fields, and buttons', () => {
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      logout: jest.fn(),
    }));
    render(
      <QueryClientWrapper>
        <Login />
      </QueryClientWrapper>
    );
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByText(`Create an Account`)).toBeInTheDocument();
    expect(screen.getByText(`Forgot Password`)).toBeInTheDocument();
    expect(screen.getByText(`Login`)).toBeInTheDocument();
    expect(screen.getByText(`or continue with`)).toBeInTheDocument();
    expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
  });

  describe('Actions', () => {
    beforeEach(() => {
      useAuth.mockImplementation(() => ({
        login: jest.fn(),
        logout: jest.fn(),
      }));
      render(
        <QueryClientWrapper>
          <Login />
        </QueryClientWrapper>
      );
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

      expect(screen.getByText(/Username must be an email/i));
    });

    it('should log a user in.', async () => {
      MockAxios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: {} } })
      );

      const username = screen.getByPlaceholderText('Username');
      const password = screen.getByPlaceholderText('Password');
      await act(() => {
        fireEvent.change(username, { target: { value: 'username@test.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
      });

      await act(() => {
        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });
      expect(MockAxios.post).toHaveBeenCalled();
    });
    it('should show invalid credentials message.', async () => {
      MockAxios.post.mockImplementation(() =>
        Promise.reject({ data: { user: {} } })
      );

      const username = screen.getByPlaceholderText('Username');
      const password = screen.getByPlaceholderText('Password');
      await act(() => {
        fireEvent.change(username, { target: { value: 'username@test.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
      });

      await act(() => {
        const button = screen.getByText(/Login/i);
        fireEvent.click(button);
      });
      expect(MockAxios.post).toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
