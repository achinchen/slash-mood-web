import type { QueryFunction } from 'react-query';

type Options = {
  payload?: unknown;
} & RequestInit;

type Pagination = {
  pageParam?: number;
};

class FetchError extends Error {
  constructor(public status: Response['status'], message?: string) {
    super(message);
  }
}

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const query = (path: string, options: Options): QueryFunction<unknown> => {
  return async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`,
      {
        method: options.method || 'GET',
        headers: options.headers || HEADERS,
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

export const getInitialPaginationQuery = async (
  path: string
): Promise<unknown | FetchError> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`
  );

  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new FetchError(response.status, result.message);
  }
};

export const paginationQuery = (path: string) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async function ({ pageParam = 2 }: Pagination) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}&page=${pageParam}`
    );

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new FetchError(response.status, result.message);
    }
  };
};

export default query;
