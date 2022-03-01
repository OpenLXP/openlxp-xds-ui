import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/login';
import MockAxios from 'jest-mock-axios';
import React from 'react';
import mockRouter from 'next-router-mock';
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
    expect(screen.getByText(`Login`)).toBeInTheDocument();
  });

  it.skip('should render the sso button', () => {
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      logout: jest.fn(),
    }));
    render(
      <QueryClientWrapper>
        <Login />
      </QueryClientWrapper>
    );
    // expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
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

    it('should change values on input: Email', () => {
      const input = screen.getByPlaceholderText('Email');
      
      act(() => {
        fireEvent.change(input, { target: { value: 'email' } });
      });

      expect(input.value).toBe('email');
    });

    it('should change values on input: Password', () => {
      const input = screen.getByPlaceholderText('Password');

      fireEvent.change(input, { target: { value: 'password' } });

      expect(input.value).toBe('password');
    });

    it('should change show error message for empty attributes', () => {
      const input = screen.getByPlaceholderText('Password');

      fireEvent.change(input, { target: { value: '' } });

      const button = screen.getByText(/Login/i);
      fireEvent.click(button);

      expect(screen.getByText(/All fields required/i)).toBeInTheDocument();
    });

    it('should change show error message for valid email', () => {
      const email = screen.getByPlaceholderText('Email');
      const password = screen.getByPlaceholderText('Password');

      fireEvent.change(email, { target: { value: 'email' } });
      fireEvent.change(password, { target: { value: 'password' } });
      const button = screen.getByText(/Login/i);
      fireEvent.click(button);

      expect(screen.getByText(/Please enter a valid email address/i));
    });

    it('should log a user in.', () => {
      MockAxios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: {} } })
      );

      const email = screen.getByPlaceholderText('Email');
      const password = screen.getByPlaceholderText('Password');
      fireEvent.change(email, { target: { value: 'email@test.com' } });
      fireEvent.change(password, { target: { value: 'password' } });

      const button = screen.getByText(/Login/i);
      fireEvent.click(button);
      expect(MockAxios.post).toHaveBeenCalled();
    });
    it('should show invalid credentials message.', async () => {
      MockAxios.post.mockImplementation(() =>
        Promise.reject({ data: { user: {} } })
      );

      const email = screen.getByPlaceholderText('Email');
      const password = screen.getByPlaceholderText('Password');
      act(() => {
        fireEvent.change(email, { target: { value: 'email@test.com' } });
        fireEvent.change(password, { target: { value: 'password' } });
      });

      const button = screen.getByText(/Login/i);
      await act(() => {
        fireEvent.click(button);
      });
      expect(MockAxios.post).toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
