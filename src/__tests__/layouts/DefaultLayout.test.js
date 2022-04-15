import { render, act, fireEvent, screen } from '@testing-library/react';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { QueryClientProvider, QueryClient } from 'react-query';
import mockRouter from 'next-router-mock';
import {
  useAuthenticatedUser,
  useMockConfig,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
jest.mock('next/dist/client/router', () => require('next-router-mock'));

const Wrapper = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  useMockConfig();
});

const renderer = () => {
  mockRouter.setCurrentUrl('/');
  return render(
    <QueryClientWrapper>
      <DefaultLayout>test child</DefaultLayout>
    </QueryClientWrapper>
  );
};

describe('Default Layout', () => {
  it('should show the header & footer component', () => {
    useUnauthenticatedUser();
    renderer();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();

    expect(screen.getByText('DOD Home Page')).toBeInTheDocument();
    expect(screen.getByText('About ADL')).toBeInTheDocument();
    expect(screen.getByText('Web Policy')).toBeInTheDocument();

    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact US')).toBeInTheDocument();
  });
  it('should show the user menu button when authenticated', () => {
    useAuthenticatedUser();
    renderer();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
  });

  it('should show the child components', () => {
    useAuthenticatedUser();
    renderer();
    expect(screen.getByText('test child')).toBeInTheDocument();
  });
});
