import { fireEvent, render, act } from '@testing-library/react';

import Unathorized from '../../pages/401';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';


const renderer = () => {

  return render(
    <MemoryRouterProvider>
        <Unathorized />
    </MemoryRouterProvider>
  );
};

describe('401 Page', () => {
  it('should render the page', () => {

    const { getByText } = renderer();
    expect(getByText('401 Unauthorized')).toBeInTheDocument();
    expect(getByText('Redirecting in')).toBeInTheDocument();
    expect(getByText('Click Here to be Redirected')).toBeInTheDocument();
  });

  it('should click redirect button', () => {

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const { getByText } = renderer();
    new Promise((r) => setTimeout(r, 2000));
    act(() => {
        const button = getByText(/Click Here to be Redirected/i);
        fireEvent.click(button);
      });
    
    expect(getByText('Click Here to be Redirected')).toBeInTheDocument();
  });

});
