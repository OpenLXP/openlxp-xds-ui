import { render, act, fireEvent, screen } from '@testing-library/react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { QueryClientProvider, QueryClient } from 'react-query';

const Wrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Default Layout', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <DefaultLayout>Test Child Value</DefaultLayout>
      </Wrapper>
    );
  });

  it('should show the header component', () => {
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();
  });
  it('should show the footer component', () => {
    expect(screen.getByText('footer')).toBeInTheDocument();
  });

  it('should show the child components', () => {
    expect(screen.getByText('Test Child Value'));
  });
});