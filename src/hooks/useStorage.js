'use strict';

import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(key, defaultValue) {
  const useLocal = useStorage(key, defaultValue, window.localStorage)
  if (typeof window !== 'undefined') {
    return useLocal;
  }
  return [defaultValue]
}

export function useSessionStorage(key, defaultValue) {
  const useSession = useStorage(key, defaultValue, window.sessionStorage)
  if (typeof window !== 'undefined') {
    return useSession;
  }
  return [defaultValue]
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
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
