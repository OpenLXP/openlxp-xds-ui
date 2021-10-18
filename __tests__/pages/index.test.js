import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/index';

describe('should render the title', () => {
  it('should render the title, search bar and button', () => {
    render(<Home />);
    expect(screen.getByText(`Enterprise Course Catalog`)).toBeInTheDocument();
    expect(screen.getByText(`Department of Defense`)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(`Search the catalog`)
    ).toBeInTheDocument();
  });

  it('should not navigate away if no field.keyword or empty keyword', () => {
    render(<Home />);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '' },
      });
    });
    act(() => {
      fireEvent.click(screen.getByTitle(/search/i));
    });

    expect(screen.getByRole('textbox', { id: /search-bar/i }).value).toBe('');
  });

  it.skip(
    'should navigate away from the page when a field.keyword is present',
    () => {
      render(<Home />);

      act(() => {
        fireEvent.change(screen.getByPlaceholderText('Search the catalog'), {
          target: { value: 'updated value' },
        });
      });

      act(() => {
        fireEvent.click(screen.getByTitle(/search/i));
      });
    }
  );
  it('should update the value of the search bar', () => {
    render(<Home />);

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Search the catalog'), {
        target: { value: 'updated value' },
      });
    });

    expect(screen.getByPlaceholderText('Search the catalog').value).toBe(
      'updated value'
    );
  });
});
