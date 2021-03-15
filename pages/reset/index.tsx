import { useState } from 'react';
import Head from 'next/head';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function ForgotPassword(): JSX.Element {
  const [password, setPassword] = useState('');

  const onClose = () => window.location.assign('somewhere');

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Mood Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="返回"
          >
            <img
              className={styles.closeButtonIcon}
              src="/images/icon/close.svg"
              alt="返回"
            />
          </button>
          <img className={styles.logo} src="/logo.png" alt="slash mood logo" />
        </header>
        <form className={styles.form}>
          <TextInput
            value={password}
            onValueChange={setPassword}
            label="Password"
            type="password"
            name="current-password"
            autoComplete="current-password"
          />
        </form>
        <footer className={styles.bottom}>
          <Button color="dark" fullwidth>
            重設密碼
          </Button>
        </footer>
      </main>
    </div>
  );
}

export default ForgotPassword;
