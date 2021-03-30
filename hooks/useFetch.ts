import { useCallback, useState } from 'react';

type Parameters = {
  payload?: unknown;
  path: string;
} & RequestInit;

type ReturnValues = {
  loading: boolean;
  error?: { [key: string]: string };
  result?: unknown;
  requestFetch: () => Promise<void>;
};

function useFetch({
  method,
  headers,
  path,
  payload
}: Parameters): ReturnValues {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState();

  const requestFetch = useCallback(async () => {
    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`,
      {
        method,
        headers: headers || {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.status === 204) {
      setError(undefined);
      setLoading(false);
      return;
    }

    try {
      const result = await response.json();

      if (!`${response.status}`.startsWith('4')) {
        setResult(result);
        setError(undefined);
      } else {
        setError(result);
      }
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, [headers, method, path, payload]);

  return { loading, error, result, requestFetch };
}

export default useFetch;
