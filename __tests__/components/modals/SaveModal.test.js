import { act, screen, render, fireEvent } from '@testing-library/react';
import SaveModal from '../../../components/modals/SaveModal';
import { useUserOwnedLists } from '../../../hooks/useUserOwnedLists.js';
import { QueryClientWrapper } from '../../../__mocks__/queryClientMock';

function close() {}

jest.mock('../../../hooks/useUserOwnedLists.js', () => ({
  useUserOwnedLists: jest.fn(),
}));

describe('SaveModal', () => {
  beforeEach(() => {
    useUserOwnedLists.mockImplementation(() => ({
      data: {
        "id": 1,
        "owner": {
          "id": 2,
          "email": "test@test.com",
          "first_name": "S",
          "last_name": "C"
        },
        "subscribers": [
          {
            "id": 2,
            "email": "test@test.com",
            "first_name": "S",
            "last_name": "C"
          }
        ],
        "created": "2021-08-16T15:54:40.903844Z",
        "modified": "2021-08-24T19:35:03.023271Z",
        "description": "Description",
        "name": "Interest List",
        "experiences": [
          "aa5a589308f7d02db5a17bd20664417f",
          "undefined"
        ]
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show a modal contents: title, text, buttons', () => {
    render(
      <QueryClientWrapper>
        <SaveModal
          id={'12345'}
          modalState={true}
          closeModal={() => close}
        />
      </QueryClientWrapper>
    );

    expect(screen.getByText('Your Lists')).toBeInTheDocument();
    expect(screen.getByText('Add this course to a list.')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

  });
});
