import { Fragment, useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import useEmail from 'hooks/useEmail';
import usePassword from 'hooks/usePassword';
import query from 'utils/query';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

function Login(): JSX.Element {
  const [fetchedError, setFetchedError] = useState('');
  const { email, setEmail, emailHelperText, onBlurEmail } = useEmail(
    'chin@achin.tw'
  );

  const {
    password,
    setPassword,
    passwordHelperText,
    onBlurPassword
  } = usePassword('Achin');

  const passValidation = !(emailHelperText || passwordHelperText);
  const payload = useMemo(() => ({ email, password }), [email, password]);

  const { isLoading, isError, refetch } = useQuery(
    'login',
    query('/login', { method: 'POST', payload }),
    {
      enabled: false,
      retry: false,
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
      },
      onSuccess: () => {
        setFetchedError('');
        window.location.assign('/mood');
      }
    }
  );

  const onSubmit = () => refetch();

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
        <div className={styles.error} hidden={!isError}>
          <Emoji emoji="🥺" ariaLabel="Some error happened!" />
          {fetchedError}
        </div>
        <footer className={styles.footer}>
          <Button
            color="dark"
            fullwidth
            disabled={!passValidation || isLoading}
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
