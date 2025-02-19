jest.mock('@/utils/xapi', () => {
  const actualModule = jest.requireActual('@/utils/xapi');
  return {
    ...actualModule,
    sendStatement: jest.fn(() => Promise.resolve({})),
  };
});

import { act, fireEvent, render } from '@testing-library/react';
import { sendStatement } from '@/utils/xapi';
import {
  useMockClipboard,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import ShareButton from '@/components/buttons/ShareBtn';

describe('ShareButton', () => {
  beforeEach(() => {
    useUnauthenticatedUser();
    useMockClipboard();
  });
  it('should render correctly', () => {
    const screen = render(<ShareButton />);

    expect(screen.getByText('Share')).toBeEnabled();
  });
  it('should call sendStatement', async () => {
    const screen = render(<ShareButton />);
    await act(async () => {
      fireEvent.click(screen.getByText('Share'));
    });
    expect(sendStatement).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
