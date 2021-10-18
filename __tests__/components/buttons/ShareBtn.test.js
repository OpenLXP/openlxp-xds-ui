import { act, screen, render, fireEvent } from '@testing-library/react';
import ShareBtn from '../../../components/buttons/ShareBtn';

describe('ShareBtn', () => {
  it('has an id', () => {
    render(<ShareBtn />);

    expect(screen.getByRole('button').id).not.toBeNull();
  });
  it.skip('has shows copied message when clicked', () => {});
});
