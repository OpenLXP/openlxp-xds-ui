import { fireEvent, render, act } from '@testing-library/react';

import Forbidden from '../../pages/403';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import singletonRouter from 'next/router';

// mocks
jest.mock('next/dist/client/router', () => require('next-router-mock'));

const renderer = () => {

  return render(
    <MemoryRouterProvider>
        <Forbidden />
    </MemoryRouterProvider>
  );
};

describe('401 Page', () => {
  it('should render the page', () => {

    const { getByText } = renderer();
    expect(getByText('403 Forbidden')).toBeInTheDocument();
    expect(getByText('Redirecting in')).toBeInTheDocument();
    expect(getByText('Click Here to be Redirected')).toBeInTheDocument();
  });

  it('should timeout and redirect', () => {

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const { getByText } = renderer();
    new Promise((r) => setTimeout(r, 16000));
    expect(singletonRouter).toMatchObject({
        asPath: '',
      });
  });

  it('should click redirect button', () => {

    const { getByText } = renderer();
    act(() => {
        const button = getByText(/Click Here to be Redirected/i);
        fireEvent.click(button);
      });
    expect(singletonRouter).toMatchObject({
        asPath: '/',
      });
  });

});
