import type { QueryFunction } from 'react-query';
type Options = {
  payload?: unknown;
} & RequestInit;

class FetchError extends Error {
  constructor(public status: Response['status'], message?: string) {
    super(message);
  }
}

const query = (path: string, options: Options): QueryFunction<unknown> => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  return async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`,
      {
        method: options.method,
        headers: options.headers || headers,
        body: options.payload ? JSON.stringify(options.payload) : undefined
      }
    );

    if (response.status === 204) return;
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new FetchError(response.status, result.message);
    }
  };
};

export default query;
