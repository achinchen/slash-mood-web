import { useState } from 'react';
import fetcher, { FetchError } from 'libs/fetch';

type Parameter = {
  fetchArgs: Parameters<typeof fetcher>;
  onSuccess?: (result: unknown) => void;
  onError?: (error: FetchError) => void;
};

type Return = {
  loading: boolean;
  fetcher: () => Promise<void>;
};

const useFetch = ({ fetchArgs, onSuccess, onError }: Parameter): Return => {
  const [loading, setLoading] = useState(false);

  const fetcher = async () => {
    setLoading(true);
    try {
      const result = await fetch(...fetchArgs);
      onSuccess?.(result);
    } catch (error) {
      onError?.(error as FetchError);
    }

    setLoading(false);
  };

  return { loading, fetcher };
};

export default useFetch;
