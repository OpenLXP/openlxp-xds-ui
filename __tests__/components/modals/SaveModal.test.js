import { act, screen, render, fireEvent } from '@testing-library/react';
import SaveModal from '../../../components/modals/SaveModal';

import userListData from '../../../__mocks__/data/userLists.data';
import { useUserOwnedLists } from '../../../hooks/useUserOwnedLists.js';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';

jest.mock('../../../hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

describe('SaveModal', () => {
  beforeEach(() => {
    useUserOwnedLists.mockImplementation(() => ({
      data: userListData,
      isSuccess: true,
    }));
  });

  it('should show a modal contents: title', () => {
    const { getByText } = render(
      <QueryClientWrapper>
        <SaveModal id={'12345'} modalState={true} closeModal={() => {}} />
      </QueryClientWrapper>
    );

    act(() => {
      const button = getByText(/save/i);
      fireEvent.click(button);
    });

    expect(getByText(/add course to lists/i)).toBeInTheDocument();
    expect(getByText(/test title 1/i)).toBeInTheDocument();
  });
});
