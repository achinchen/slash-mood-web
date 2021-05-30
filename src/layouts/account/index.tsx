import { FC, ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './style.module.scss';

type Props = {
  title?: string;
  withCloseButton?: boolean;
  children: ReactElement;
};

const DeviseLayout: FC<Props> = ({ title, withCloseButton, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className={styles.header}>
          {withCloseButton && (
            <Link passHref href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.closeButton}>
                <img
                  className={styles.closeButtonIcon}
                  src="/images/icon/close.svg"
                  alt="返回"
                />
              </a>
            </Link>
          )}
          <img className={styles.logo} src="/logo.png" alt="slash mood logo" />
        </header>
        {children}
      </main>
    </div>
  );
};

export default DeviseLayout;
