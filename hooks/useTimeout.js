import { useEffect, useState } from 'react';

export default function useTimeout(ms) {
  const [state, setState] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timer;

    if (isMounted) {
      timer = setTimeout(() => {
        setState(false);
      }, ms);
    }

    // cleanup
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  });

  function handleShow() {
    setState(true);
  }
  
  return [state, handleShow];
}