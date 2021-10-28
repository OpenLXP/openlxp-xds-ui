import { act, screen, render, fireEvent } from '@testing-library/react';
import SaveModal from '../../../components/modals/SaveModal';
import { userOwnedLists } from "../../../config/endpoints";
import { useUserOwnedLists } from '../../../hooks/useUserOwnedLists.js';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';

function close() {}

jest.mock('../../../hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

describe('SaveModal', () => {
  beforeEach(() => {
    useUserOwnedLists.mockImplementation(() => ({
      data: userOwnedLists,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show a modal contents: title, text, buttons', () => {
    act(() => {
      render(
        <QueryClientWrapper>
          <SaveModal id={'12345'} modalState={true} closeModal={() => close} />
        </QueryClientWrapper>
      );
    });

    expect(screen.getByText('Your Lists')).toBeInTheDocument();
    expect(screen.getByText('Add this course to a list.')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
