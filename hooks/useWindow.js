export default function useWindow(fn) {
  if (typeof window !== 'undefined') {
    return fn();
  }
}
