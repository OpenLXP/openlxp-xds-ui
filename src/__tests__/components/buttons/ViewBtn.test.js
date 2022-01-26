import { act, screen, render, fireEvent } from '@testing-library/react';
import ViewBtn from "../../../components/buttons/ViewBtn";

describe('ShareBtn', () => {
  it('has an id', () => {
    render(<ViewBtn />);

    expect(screen.getByRole('button').id).not.toBeNull();
  });
});
