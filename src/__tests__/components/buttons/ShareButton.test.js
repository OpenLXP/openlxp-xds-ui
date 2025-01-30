import * as xapi from '@/utils/xapi';
import { act, fireEvent, render } from '@testing-library/react';
import { useUnauthenticatedUser } from '@/__mocks__/predefinedMocks';
import ShareButton from '@/components/buttons/ShareBtn';

describe('ShareButton', () => {
  it('should render correctly', () => {
    useUnauthenticatedUser();
    const screen = render(<ShareButton />);

    expect(screen.getByText('Share')).toBeEnabled();
  });
  it.skip('should call sendStatement', async () => {
    const spy = jest
      .spyOn(xapi, 'sendStatement')
      .mockImplementation(() => Promise.resolve({}));
    useUnauthenticatedUser();
    const screen = render(<ShareButton />);
    await act(async () => {
      fireEvent.click(screen.getByText('Share'));
    });
    expect(spy).toHaveBeenCalled();
  });
});
