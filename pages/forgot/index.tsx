import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState('');
  const [countDown, setCountDown] = useState(-1);

  const onClose = () => window.location.assign('somewhere');

  const onSubmit = () => {
    setCountDown(30);
  };

  useEffect(() => {
    if (countDown < 0) return;

    setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown]);

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
        </form>
        <footer className={styles.bottom}>
          <Button
            color="dark"
            fullwidth
            disabled={countDown > 0 || !email}
            onClick={onSubmit}
          >
            {countDown < 0
              ? '寄送重設密碼信到 Email'
              : `重新寄送重設密碼信(${countDown})`}
          </Button>
          <div className={styles.reminder}>
            <Link href="/login">返回登入</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ForgotPassword;
