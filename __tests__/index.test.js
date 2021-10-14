import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

describe('should render the title', () => {
  it('should render "Welcome to Next.js!"', () => {
    render(<Home />);

    expect(screen.getByText('Welcome to Next.js!')).toBeInTheDocument();
  });
});
