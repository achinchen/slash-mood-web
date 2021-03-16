import { Fragment, useState } from 'react';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function ForgotPassword(): JSX.Element {
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <Fragment>
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
      </Fragment>
    </Layout>
  );
}

export default ForgotPassword;
