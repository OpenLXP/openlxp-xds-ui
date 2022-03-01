import About from '../../pages/about';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <QueryClientProvider client={queryClient}>
        <About />
    </QueryClientProvider>
  );
};

describe('About ECC Page', () => {
  it('should render the page', () => {

    const { getByText } = renderer();
    expect(getByText('About Enterprise Course Catalog (ECC)')).toBeInTheDocument();
    expect(getByText('The Challenge')).toBeInTheDocument();
    expect(getByText('About the Project')).toBeInTheDocument();
  });

});

