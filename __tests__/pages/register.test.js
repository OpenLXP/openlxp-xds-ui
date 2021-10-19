import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Register from '../../pages/register';

describe('should render the title', () => {
  it('should render the Register screen title, input fields, and buttons', () => {
    render(<Register />);
    expect(screen.getByText(`Create your account`)).toBeInTheDocument();
    expect(screen.getByText(`Sign in to your Account`)).toBeInTheDocument();
    expect(screen.getByText(`Create`)).toBeInTheDocument();
    expect(screen.getByText(`or continue with`)).toBeInTheDocument();
    expect(screen.getByText(`Single Sign On`)).toBeInTheDocument();
  });

  it('checking input field errors, create button click', () => {
    render(<Register />);

    act(() => {
      fireEvent.click(screen.getByText("Create"));
    });
    expect(screen.getByText(`Please enter a First Name/Last Name/Email/Password`)).toBeInTheDocument();
    
    act(() => {
        fireEvent.change(screen.getByPlaceholderText("First Name"), {
            target: { value: "Test" },
        });
        fireEvent.change(screen.getByPlaceholderText("Last Name"), {
            target: { value: "Test" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password" },
        });
    });
    act(() => {
        fireEvent.click(screen.getByText("Create"));
    });
    expect(screen.getByText(`Must be a valid email`)).toBeInTheDocument();
    
    act(() => {
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test@test.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "test" },
        });
    });
    act(() => {
        fireEvent.click(screen.getByText("Create"));
    });
    expect(screen.getByText(`Password must be a minimum of 8 characters`)).toBeInTheDocument();

    act(() => {
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password" },
        });
    });
    act(() => {
        fireEvent.click(screen.getByText("Create"));
    });
  });

});
