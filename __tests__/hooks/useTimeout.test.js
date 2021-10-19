import { renderHook, act } from '@testing-library/react-hooks';
import useTimeout from '../../hooks/useTimeout';

describe('useTimeout', () => {
  it('should default to false', () => {
    const { result } = renderHook(() => useTimeout(1000));

    expect(result.current.state).toBeFalsy();
  });
  it('should show for 1s', () => {
    const { result } = renderHook(() => useTimeout(1000));
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    act(() => {
      result.current.show();
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
  it('should show for 1s before returning to false', () => {
    const { result } = renderHook(() => useTimeout(1000));
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    act(() => {
      result.current.show();
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect( setTimeout ).toHaveBeenCalledWith( expect.any( Function ), 1000 );
    expect(result.current.state).toBeFalsy()
  });
});
