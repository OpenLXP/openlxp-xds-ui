'use strict';

import { render, screen } from '@testing-library/react';

import ExternalBtn from '@/components/buttons/ExternalBtn';
import '@testing-library/jest-dom'

describe('External Button', () => {
  it('should render', () => {
    render(<ExternalBtn url={'https://www.google.com'} />);
    expect(screen.getByText('Enroll')).toBeInTheDocument();
  });
});
