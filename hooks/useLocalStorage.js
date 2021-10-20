import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };
  const [storedValue, setStoredValue] = useState(getValue);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStoredValue(getValue());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(getValue());
    };

    document.addEventListener('storage', handleStorageChange);
    document.addEventListener('local-storage', handleStorageChange);

    return () => {
        document.removeEventListener('storage', handleStorageChange);
        document.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue];
}
