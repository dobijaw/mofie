import { useState, useEffect, useRef, useCallback } from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [url]);

  useEffect(() => {
    const controller = new window.AbortController();
    const { signal } = controller;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (!signal.aborted) {
          setResponse(res);
        }
      })
      .catch((err) => {
        if (!signal.aborted) {
          setError(err);
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url, options]);

  return [response, error, loading];
};

export const useDataProduction = (allLoaded, response, movieGenres, showGenres, callback) => {
  const [output, setOutput] = useState([]);
  const [dataLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (allLoaded) {
      const filteredResponse = callback(response, movieGenres, showGenres);
      setOutput(filteredResponse);
      setLoaded(true);
    }
  }, [allLoaded, callback, response, movieGenres, showGenres]);

  return [output, dataLoaded];
};

export const useOutsideClosing = (setFn) => {
  const ref = useRef(null);

  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setFn(false);
      }
    },
    [setFn],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return ref;
};
