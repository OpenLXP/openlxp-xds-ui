import { render, act, screen, fireEvent } from '@testing-library/react';
import { QueryClientWrapper } from '../../__mocks__/queryClientMock';

import Search from 'pages/search';

describe('Search Page', () => {
  beforeEach(() => {
    render(
      <QueryClientWrapper>
        <Search query={{ keyword: 'test value' }} />
      </QueryClientWrapper>
    );
  });

  it('should render the search bar', () => {
    expect(
      screen.getByPlaceholderText('Search the catalog')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search the catalog').value).toBe(
      'test value'
    );
  });

  it('should reset keyword value on reset', () => {
    act(() => {
      const button = screen.getByTitle('reset');
      fireEvent.click(button);
    });

    expect(screen.getByPlaceholderText('Search the catalog').value).toBe('');
  });

  it('should update values when typed', () => {
    act(() => {
      const input = screen.getByPlaceholderText('Search the catalog');
      fireEvent.change(input, { target: { value: 'test' } });
    });

    expect(screen.getByPlaceholderText('Search the catalog').value).toBe(
      'test'
    );
  });
});

describe('Search Page', () => {
  it.todo('should render the select list');
  it.todo('should render the results');
  it.todo('should show the save button if a user is logged in');
  it.todo('should show the save this search button if a user is logged in');
});
