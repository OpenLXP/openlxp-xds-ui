'use strict';

import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  if (typeof window !== 'undefined') {
    return useStorage(key, defaultValue, window.localStorage);
  }
  return [defaultValue]
}

export function useSessionStorage(key, defaultValue) {
  if (typeof window !== 'undefined') {
    return useStorage(key, defaultValue, window.sessionStorage);
  }
  return [defaultValue]
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) {
      try{
        parseJSON = JSON.parse(jsonValue);
      }catch(error){
        console.log("Storage parsing was not able to be processed!")
      }
      return parseJSON;
    }

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
