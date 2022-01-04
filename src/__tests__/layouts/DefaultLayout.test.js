import { render, act, fireEvent, screen } from '@testing-library/react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { QueryClientProvider, QueryClient } from 'react-query';
import mockRouter from 'next-router-mock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

const Wrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Default Layout', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
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
    // expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About DOD')).toBeInTheDocument();
    expect(screen.getByText('Web Policy')).toBeInTheDocument();

    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact US')).toBeInTheDocument();
  });

  it('should show the child components', () => {
    expect(screen.getByText('Test Child Value'));
  });
});
