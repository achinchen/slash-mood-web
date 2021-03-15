import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
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
            className={styles.formField}
            value={email}
            onValueChange={setEmail}
            label="Email"
            type="email"
            inputMode="email"
            name="current-email"
            autoComplete="current-email"
          />
          <TextInput
            className={styles.formField}
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
            登入
          </Button>
          <Link passHref href="/forgot">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.forgotPassword}>忘記密碼嗎？</a>
          </Link>

          <div className={styles.reminder}>
            還沒有帳號？
            <Link href="/signup">註冊</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Login;
