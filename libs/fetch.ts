import fetch from 'isomorphic-unfetch';
import { API_HOSTNAME } from 'config';

type Options = {
  payload?: unknown;
} & RequestInit;

export class FetchError extends Error {
  constructor(public status: Response['status'], message?: string) {
    super(message);
  }
}

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export default async function fetcher(
  path: string,
  options: Options = {}
): Promise<unknown> {
  const url = path === 'records' ? `${API_HOSTNAME}/records` : '';
  const response = await fetch(url || `${API_HOSTNAME}/${path}`, {
    method: options.method || 'GET',
    headers: options.headers || HEADERS,
    body: options.payload ? JSON.stringify(options.payload) : undefined
  });

  if (response.status === 204) return;
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new FetchError(response.status, result.message);
  }
}
