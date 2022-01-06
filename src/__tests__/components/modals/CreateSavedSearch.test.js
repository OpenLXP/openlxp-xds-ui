import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CreateSavedSearchModal from '@/components/modals/CreateSavedSearch';
import { useCreateSaveSearch } from '@/hooks/useCreateSaveSearch';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';

jest.mock('@/hooks/useCreateSaveSearch', () => ({
  useCreateSaveSearch: jest.fn(),
}));

const mutateFn = jest.fn();

const renderer = () => {
  useCreateSaveSearch.mockImplementation(() => ({
    mutate: mutateFn,
    isSuccess: true,
  }));
  return render(
    <QueryClientWrapper>
      <CreateSavedSearchModal path={'/path'} />
    </QueryClientWrapper>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('Save this search', () => {
  it('should show the button.', () => {
    const { getByText } = renderer();
    expect(getByText(/save this search/i)).toBeInTheDocument();
  });
  it('should show modal on click', () => {
    const { getByText } = renderer();

    act(() => {
      const button = getByText(/save this search/i);
      fireEvent.click(button);
    });

    expect(getByText('Save')).toBeInTheDocument();
  });
  it('should change value when typed', () => {
    const { getByText, getByPlaceholderText } = renderer();

    act(() => {
      const button = getByText(/save this search/i);
      fireEvent.click(button);
    });

    const input = getByPlaceholderText(/query name/i);
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    expect(input.value).toBe('test');
  });
  it('should call useCreateSaveSearch', () => {
    const { getByText, getByPlaceholderText } = renderer();

    act(() => {
      const button = getByText(/save this search/i);
      fireEvent.click(button);
    });

    const input = getByPlaceholderText(/query name/i);
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.click(getByText('Save'));
    });
    expect(mutateFn).toHaveBeenCalled();
  });
  it('should not call useCreateSaveSearch', () => {
    const { getByText, getByPlaceholderText } = renderer();

    act(() => {
      const button = getByText(/save this search/i);
      fireEvent.click(button);
    });

    const input = getByPlaceholderText(/query name/i);
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    act(() => {
      fireEvent.click(getByText('Save'));
    });
    expect(mutateFn).not.toHaveBeenCalled();
  });
});
