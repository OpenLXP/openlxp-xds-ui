import { render, act, screen, fireEvent } from '@testing-library/react';

import SaveBtn from 'components/buttons/SaveBtn';

describe('SaveBtn', () => {
  beforeEach(() => {
    render(<SaveBtn id={1} />);
  });

  it('should have save title', () => {
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
  it('should have id', () => {
    expect(screen.getByText('Save').id).not.toBeNull();
  });
});
