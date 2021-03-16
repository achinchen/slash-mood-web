import { Fragment, useState } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout withCloseButton>
      <Fragment>
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
        <footer className={styles.footer}>
          <Button color="dark" fullwidth>
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
