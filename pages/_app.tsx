import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.scss';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
