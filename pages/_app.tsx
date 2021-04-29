import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.scss';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClientRef: { current?: QueryClient } = useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
