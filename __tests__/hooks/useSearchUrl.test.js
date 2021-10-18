const { renderHook, act } = require('@testing-library/react-hooks');
const { default: useSearchUrl } = require('../../hooks/useSearchUrl');

describe('useUrl', () => {
  it('creates query string from an object', () => {
    const { result } = renderHook(() => useSearchUrl({ test: 'value' }));
    act(() => {});

    // no localhost is provided during the mock
    expect(result.current.url).toBe('undefinedes-api/?test=value');
  });

  it('updates value from a new object', () => {
    const { result } = renderHook(() => useSearchUrl({ test: 'test' }));

    act(() => {
      result.current.setUrl({ test: 'updated' });
    });

    expect(result.current.url).toBe('undefinedes-api/?test=updated');
  });
});
