import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Register from '../../pages/register';
import { useAuth } from '../../contexts/AuthContext';
import MockAxios from 'jest-mock-axios';

import mockRouter from 'next-router-mock';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockRegister = jest.fn();
const logout = jest.fn();
beforeEach(() => {
  mockRouter.setCurrentUrl('/login');
  useAuth.mockImplementation(() => ({
    register: mockRegister,
    logout: logout,
  }));
  render(
    <QueryClientWrapper>
      <Register />
    </QueryClientWrapper>
  );
});
describe('Register Page', () => {
  it('should render the Register screen title, input fields, and buttons', () => {
    expect(screen.getByText(`Create your account`)).toBeInTheDocument();
    expect(screen.getByText(/Sign in to your Account/i)).toBeInTheDocument();
    expect(screen.getByText(`Create`)).toBeInTheDocument();
    expect(screen.getByText(`or continue with`)).toBeInTheDocument();
    expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
  });
});

describe('Register Page actions', () => {
  it('should change values on input: First Name', () => {
    const input = screen.getByPlaceholderText('First Name');

    act(() => {
      fireEvent.change(input, { target: { value: 'myName' } });
    });

    expect(input.value).toBe('myName');
  });
  it('should change values on input: Last Name', () => {
    const input = screen.getByPlaceholderText('Last Name');

    act(() => {
      fireEvent.change(input, { target: { value: 'myName' } });
    });

    expect(input.value).toBe('myName');
  });
  it('should change values on input: Email', () => {
    const input = screen.getByPlaceholderText('Email');

    act(() => {
      fireEvent.change(input, { target: { value: 'myName' } });
    });

    expect(input.value).toBe('myName');
  });
  it('should change values on input: Password', () => {
    const input = screen.getByPlaceholderText('Email');

    act(() => {
      fireEvent.change(input, { target: { value: 'myName' } });
    });

    expect(input.value).toBe('myName');
  });

  it('should show an error message for valid email', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: 'myName' } });
      fireEvent.change(lastName, { target: { value: 'myName' } });
      fireEvent.change(email, { target: { value: 'myName' } });
      fireEvent.change(password, { target: { value: 'myName' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/must be a valid email/i)).toBeInTheDocument();
  });
  it('should show an error message for valid password length', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: 'myName' } });
      fireEvent.change(lastName, { target: { value: 'myName' } });
      fireEvent.change(email, { target: { value: 'test@email.com' } });
      fireEvent.change(password, { target: { value: 'myName' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(
      screen.getByText(/password must be a minimum of 8 characters/i)
    ).toBeInTheDocument();
  });
  it('should show an error message for valid empty attributes', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: '' } });
      fireEvent.change(lastName, { target: { value: 'myName' } });
      fireEvent.change(email, { target: { value: 'test@email.com' } });
      fireEvent.change(password, { target: { value: 'minimums' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
  });

  it('should register a user', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: 'valid' } });
    });
    act(() => {
      fireEvent.change(lastName, { target: { value: 'name' } });
    });
    act(() => {
      fireEvent.change(email, { target: { value: 'test@email.com' } });
    });
    act(() => {
      fireEvent.change(password, { target: { value: 'minimums' } });
    });

    act(() => {
      MockAxios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: {} } })
      );
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(MockAxios.post).toHaveBeenCalled();
    expect(useAuth).toHaveBeenCalled();
  });
});
