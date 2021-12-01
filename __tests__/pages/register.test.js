import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Register from '../../pages/register';
import { useAuth } from '../../contexts/AuthContext';
import MockAxios from 'jest-mock-axios';

import mockRouter from 'next-router-mock';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockRegister = jest.fn();
const logout = jest.fn();
beforeEach(() => {
  mockRouter.setCurrentUrl('/login');
  useAuth.mockImplementation(() => ({
    register: mockRegister,
    logout: logout
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

  it('should show an error message for empty email', () => {
    const email = screen.getByPlaceholderText('Email');
    act(() => {
      fireEvent.change(email, { target: { value: '' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  it('should show an error message for invalid email', () => {
    const email = screen.getByPlaceholderText('Email');
    act(() => {
      fireEvent.change(email, { target: { value: 'test' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
  });

  it('should show an error message when a password is empty', () => {
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    act(() => {
      fireEvent.change(email, { target: { value: 'test@tset.com' } });
      fireEvent.change(password, { target: { value: '' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });


  it('should show an error message when a password is less than 8 characters', () => {
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    act(() => {
      fireEvent.change(email, { target: { value: '1234@test.com' } });
      fireEvent.change(password, { target: { value: '123' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('should show error message when a password does not have a lowercase letter', () => {
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    act(() => {
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(password, { target: { value: '12345678' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/Password must contain at least one lowercase letter/i)).toBeInTheDocument();
  });

  it('should show error message when a password does not have an uppercase letter', () => {
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');
    act(() => {
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(password, { target: { value: '1234567n' } });
    });

    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
  });

  it('should show error message when first name is empty', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(password, { target: { value: '12345678nT!' } });
      fireEvent.change(firstName, { target: { value: '' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
  });
  it('should render error message when the first name is less than 2 characters', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(password, { target: { value: '12345678nT!' } });
      fireEvent.change(firstName, { target: { value: 'a' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/First name must be at least 2 characters/i)).toBeInTheDocument();
  });

  it('should show error message when last name is empty', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: 'Test' } });
      fireEvent.change(email, { target: { value: 'test@test.com' } });
      fireEvent.change(password, { target: { value: '12345678nT!' } });

      fireEvent.change(lastName, { target: { value: '' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
  });

  it('should render error message when the last name is less than 2 characters', () => {
    const firstName = screen.getByPlaceholderText('First Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const email = screen.getByPlaceholderText('Email');
    const password = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.change(firstName, { target: { value: 'Test' } });
      fireEvent.change(email, { target: { value: 'test@test.com'  } });
      fireEvent.change(password, { target: { value: '12345678nT!' } });
      fireEvent.change(lastName, { target: { value: 'a' } });
    });
    act(() => {
      const button = screen.getByText('Create');
      fireEvent.click(button);
    });

    expect(screen.getByText(/Last name must be at least 2 characters/i)).toBeInTheDocument();
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
})
;
