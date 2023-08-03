'use strict';

import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  let windowStore = window;
  if (typeof window !== 'undefined') {
    windowStore = window.localStorage;
  }
  return useStorage(key, defaultValue, windowStore);
}

export function useSessionStorage(key, defaultValue) {
  let windowStore = window;
  if (typeof window !== 'undefined') {
    windowStore = window.sessionStorage;
  }
  return useStorage(key, defaultValue, windowStore);
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    if (typeof storageObject === 'undefined') {
      return defaultValue;
    }
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
