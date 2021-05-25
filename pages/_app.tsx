import type { AppProps } from 'next/app';
import 'styles/globals.scss';

export const PORTAL_ID = 'portal';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <div id={PORTAL_ID} />
    </>
  );
}

export default App;
