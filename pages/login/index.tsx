import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import useFetch from 'hooks/useFetch';
import useEmail from 'hooks/useEmail';
import usePassword from 'hooks/usePassword';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

function Login(): JSX.Element {
  const [fetchedError, setFetchedError] = useState('');
  const { email, setEmail, emailHelperText, onBlurEmail } = useEmail(
    'chin@achin.dev'
  );

  const {
    password,
    setPassword,
    passwordHelperText,
    onBlurPassword
  } = usePassword('achin1234');

  const passValidation =
    !!(email && password) && !(emailHelperText || passwordHelperText);

  const payload = useMemo(() => ({ email, password }), [email, password]);

  const { loading, fetcher } = useFetch({
    fetchArgs: ['login', { method: 'POST', payload }],
    onSuccess: () => {
      setFetchedError('');
      Router.replace('/mood');
    },
    onError: ({ status }) => {
      let error = '';

      switch (status) {
        case 404:
          error = '當前的 Email 不存在';
          break;
        case 401:
          error = 'Email 或密碼有誤，請再試試';
          break;
        default:
          error = '發生不明問題，請重試看看';
      }

      setFetchedError(error);
    }
  });

  const onSubmit = () => fetcher();

  useEffect(() => {
    setFetchedError('');
  }, [email, password]);

  return (
    <Layout withCloseButton>
      <Fragment>
        <form className={styles.form}>
          <TextInput
            className={styles.formField}
            value={email}
            onValueChange={setEmail}
            onBlur={onBlurEmail}
            helperText={emailHelperText}
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
            onBlur={onBlurPassword}
            helperText={passwordHelperText}
            label="Password"
            type="password"
            name="current-password"
            autoComplete="current-password"
          />
        </form>
        <div className={styles.error} aria-hidden={!fetchedError}>
          <Emoji emoji="🥺" aria-label="Some error happened!" />
          {fetchedError}
        </div>
        <footer className={styles.footer}>
          <Button
            color="dark"
            size="lg"
            fullwidth
            disabled={!passValidation || loading || !!fetchedError}
            onClick={onSubmit}
          >
            登入
          </Button>
          <Link passHref href="/forgot">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.forgotPassword}>忘記密碼？</a>
          </Link>

          <div className={styles.reminder}>
            還沒有帳號？
            <Link href="/signup">註冊</Link>
          </div>
        </footer>
      </Fragment>
    </Layout>
  );
}

export default Login;
