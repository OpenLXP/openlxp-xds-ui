import { searchUrl } from 'config/endpoints';
import queryString from 'querystring';
import { useState } from 'react';


function makePath(params) {
  return `${searchUrl}?${queryString.stringify(params)}`;
}

export default function useUrl(initialQuery) {
  const [state, setState] = useState(() => makePath(initialQuery));

  const setUrl = (params) => {
    setState(makePath(params));
  };
  return [state, setUrl];
}
