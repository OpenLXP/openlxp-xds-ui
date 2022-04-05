import { act, fireEvent, render, screen } from '@testing-library/react';
import ShareBtn from '../../../components/buttons/ShareBtn';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
jest.useFakeTimers();
describe.skip('ShareBtn', () => {
  it('has an id', () => {
    const { container } = render(<ShareBtn />);

    expect(screen.getByRole('button').id).not.toBeNull();
  });
  it('has shows copied message when clicked', () => {
    const { container } = render(<ShareBtn />);
    jest.spyOn(navigator.clipboard, 'writeText');
    act(() => {
      fireEvent.click(screen.getByRole('button'));
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });
});
