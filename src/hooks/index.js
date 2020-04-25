import { useState, useEffect } from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url, options]);

  return [response, error, loading];
};
