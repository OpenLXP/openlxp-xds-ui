import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Login from '../../pages/login';
import { AuthContextWrapper } from '../../__mocks__/authContextMock';

describe('should render the title', () => {
  it('should render the Login screen title, input fields, and buttons', () => {
    render(<Login />);
    expect(screen.getByText(`Sign in to your account`)).toBeInTheDocument();
    expect(screen.getByText(`Create an Account`)).toBeInTheDocument();
    expect(screen.getByText(`Forgot Password`)).toBeInTheDocument();
    expect(screen.getByText(`Login`)).toBeInTheDocument();
    expect(screen.getByText(`or continue with`)).toBeInTheDocument();
    expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
  });

  it('should not navigate away if empty field, input of username and password', () => {
    render(
      <AuthContextWrapper>
        <Login />
      </AuthContextWrapper>
    );

    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });
    expect(
      screen.getByText(`Please enter a username/password`)
    ).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Username'), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'Password' },
      });
    });
    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });
  });
});
