import { useState, useEffect } from 'react';

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
        console.log(`To to: ${err}`);
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

export const useDataProduction = (
  allLoaded,
  response,
  genres,
  type,
  callback,
) => {
  const [output, setOutput] = useState([]);
  const [dataLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (allLoaded) {
      const filteredResponse = callback(response, genres, type);
      setOutput(filteredResponse);
      setLoaded(true);
    }
  }, [allLoaded, callback, response, genres, type]);

  return [output, dataLoaded];
};
