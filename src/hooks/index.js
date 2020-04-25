import { useState, useEffect } from 'react';

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, []);

  return [data, error];
};
