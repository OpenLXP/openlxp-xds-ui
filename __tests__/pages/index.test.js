import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/index';

describe('should render the title', () => {
  it('should render the title, search bar and button', () => {
    render(<Home />);
    expect(screen.getByText(`Enterprise Course Catalog`)).toBeInTheDocument();
    expect(screen.getByText(`Department of Defense`)).toBeInTheDocument();
    expect(screen.getByText(`Search`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Search the catalog`)).toBeInTheDocument();
  });
});

