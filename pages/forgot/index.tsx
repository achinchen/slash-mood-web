import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState('');
  const [countDown, setCountDown] = useState(-1);

  const onSubmit = () => {
    setCountDown(30);
  };

  useEffect(() => {
    if (countDown < 0) return;

    setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown]);

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
      </Fragment>
    </Layout>
  );
}

export default ForgotPassword;
