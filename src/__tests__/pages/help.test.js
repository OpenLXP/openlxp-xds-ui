import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import Help from '../../pages/help';

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <QueryClientProvider client={queryClient}>
        <Help />
    </QueryClientProvider>
  );
};

describe('Help Page', () => {
  it('should render the page', () => {

    const { getByText } = renderer();
    expect(getByText('Purpose')).toBeInTheDocument();
    expect(getByText('Features')).toBeInTheDocument();
    expect(getByText('Course Providers')).toBeInTheDocument();
  });

});
