import { render, act, fireEvent, screen, container } from '@testing-library/react';

import { Pagination } from '@/components/buttons/Pagination';

describe('Pagination', () => {
  it('should not show the previous button', () => {
    render(<Pagination currentPage={1} />);
    expect(
      screen.queryByText('Previous').className.includes('invisible')
    ).toBeTruthy();
  });
  it('shoul not show left double chevron button', () => {
    render(<Pagination currentPage={1} />);
    expect(
      screen.getByTitle('First').className.includes('invisible')
    ).toBeTruthy();
  })
  it('shoul not show right double chevron button', () => {
    render(<Pagination currentPage={10} totalPages={10} />);
    expect(
      screen.getByTitle('Last').className.includes('invisible')
    ).toBeTruthy();
  })
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
        handleSpecificPage={() => console.log('next')}
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
        handleSpecificPage={() => console.log('previous')}
      />
    );

    act(() => {
      const button = screen.getByText('Previous');
      fireEvent.click(button);
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('previous');
  });
  it('should move to page 4 when page 4 is selected', () => {
    render(<Pagination
      currentPage={1}
      totalPages={6}
      handleSpecificPage={(page) => console.log(page)} />
    );

    act(() => {
      const button = screen.getByRole('button', {name: /4/i});
      fireEvent.click(button);
    });

    expect(console.log).toHaveBeenCalledWith(4);
  })
});
