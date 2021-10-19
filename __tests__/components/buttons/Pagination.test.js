import { render, act, fireEvent, screen } from '@testing-library/react';

import { Pagination } from 'components/buttons/Pagination';

describe('Pagination', () => {
  it('should not show the back button', () => {
    render(<Pagination currentPage={1} />);
    expect(
      screen.queryByText('Back').className.includes('invisible')
    ).toBeTruthy();
  });
  it('should not show the next button', () => {
    render(<Pagination currentPage={10} totalPages={10} />);
    expect(
      screen.queryByText('Next').className.includes('invisible')
    ).toBeTruthy();
  });
  it('should execute the passed fn when next is clicked', () => {
    console.log = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onNext={() => console.log('next')}
      />
    );

    act(() => {
      const button = screen.getByText('Next');
      fireEvent.click(button);
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('next');
  });
  it('should execute the passed fn when back is clicked', () => {
    console.log = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onPrevious={() => console.log('back')}
      />
    );

    act(() => {
      const button = screen.getByText('Back');
      fireEvent.click(button);
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('back');
  });
});
