import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import cx from 'clsx';
import Button from 'components/Button';
import styles from './style.module.scss';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusField, setFocusField] = useState<
    'email' | 'password' | undefined
  >('password');
  const onClose = () => window.location.assign('somewhere');

  const onEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const onPassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const focusEmail = () => setFocusField('email');
  const focusPassword = () => setFocusField('password');
  const onBlur = () => setFocusField(undefined);

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
          <label className={styles.formField}>
            <span
              className={cx(styles.formFieldLabel, {
                [styles.focus]: focusField === 'email'
              })}
            >
              Email
            </span>
            {/* eslint-disable-next-line jsx-a11y/autocomplete-valid */}
            <input
              className={styles.formFieldInput}
              type="email"
              value={email}
              onChange={onEmail}
              onFocus={focusEmail}
              onBlur={onBlur}
              inputMode="email"
              name="current-email"
              placeholder=" "
              autoComplete="current-email"
            />
          </label>
          <label className={styles.formField}>
            <span
              className={cx(styles.formFieldLabel, {
                [styles.focus]: focusField === 'password'
              })}
            >
              Password
            </span>
            <input
              className={styles.formFieldInput}
              type="password"
              value={password}
              onChange={onPassword}
              onFocus={focusPassword}
              onBlur={onBlur}
              placeholder=" "
              name="current-password"
              autoComplete="current-password"
            />
          </label>
        </form>
        <footer className={styles.bottom}>
          <Button color="dark" fullwidth>
            登入
          </Button>
          <Link passHref href="/forgot">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.forgotPassword}>忘記密碼嗎？</a>
          </Link>

          <div className={styles.signupReminder}>
            還沒有帳號？
            <Link href="/signup">註冊</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Login;
