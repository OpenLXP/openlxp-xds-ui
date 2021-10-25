import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/index';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock.js';
import mockRouter from 'next-router-mock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('should render the title', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
    render(
      <QueryClientWrapper>
        <Home />
      </QueryClientWrapper>
    );
  });

  it('should render the title, search bar and button', () => {
    expect(screen.getByText(`Enterprise Course Catalog`)).toBeInTheDocument();
    expect(screen.getByText(`Department of Defense`)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(`Search the catalog`)
    ).toBeInTheDocument();
  });

  it('should not navigate away if no field.keyword or empty keyword', () => {
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

  it.skip('should navigate away from the page when a field.keyword is present', () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Search the catalog'), {
        target: { value: 'updated value' },
      });
    });

    act(() => {
      fireEvent.click(screen.getByTitle(/search/i));
    });
  });
  it('should update the value of the search bar', () => {
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
