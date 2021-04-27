import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'styles/globals.scss';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClientRef: { current?: QueryClient } = useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </QueryClientProvider>
  );
}

export default App;
