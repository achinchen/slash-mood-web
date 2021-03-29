import { useState, useRef, useMemo, useEffect, Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useFetch from 'hooks/useFetch';
import useEmail from 'hooks/useEmail';
import Layout from 'components/Layout/Account';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';
import usePassword from 'hooks/usePassword';
import useNickname from 'hooks/useNickname';

function SignUp(): JSX.Element {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [finishedRecaptchaCallback, setFinishedRecaptchaCallback] = useState(
    false
  );
  const [recaptcha, setRecaptcha] = useState('');

  const { email, setEmail, emailHelperText, onBlurEmail } = useEmail(
    'chin@achin.dev'
  );
  const {
    password,
    setPassword,
    passwordHelperText,
    onBlurPassword
  } = usePassword('Achin');
  const {
    nickname,
    setNickname,
    nicknameHelperText,
    onBlurNickname
  } = useNickname('Achin1234');

  const passValidation = !(
    emailHelperText ||
    nicknameHelperText ||
    passwordHelperText ||
    !recaptcha
  );

  const payload = useMemo(
    () => ({
      email,
      password,
      nickname
    }),
    [email, password, nickname]
  );

  const { loading, error, result, requestFetch } = useFetch({
    method: 'POST',
    path: '/signup',
    payload
  });

  const onSubmit = async () => {
    await requestFetch();
    console.log(result);
  };

  useEffect(() => {
    window['onLoadRecaptcha'] = () => {
      window.grecaptcha.render(recaptchaRef.current!, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: (response: string) => setRecaptcha(response)
      });
    };
    setFinishedRecaptchaCallback(true);
  }, []);

  return (
    <Layout withCloseButton>
      <Fragment>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {finishedRecaptchaCallback && (
            <script
              type="text/javascript"
              src={`https://www.google.com/recaptcha/api.js?onload=onLoadRecaptcha&render=explicit`}
              async
              defer
            />
          )}
        </Head>
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
            value={nickname}
            helperText={nicknameHelperText}
            onValueChange={setNickname}
            onBlur={onBlurNickname}
            label="暱稱"
            name="current-name"
            autoComplete="current-name"
          />
          <TextInput
            className={styles.formField}
            value={password}
            helperText={passwordHelperText}
            onValueChange={setPassword}
            onBlur={onBlurPassword}
            label="Password"
            type="password"
            name="current-password"
            autoComplete="current-password"
          />
        </form>
        <div className={styles.recaptcha} ref={recaptchaRef} />
        <footer className={styles.bottom}>
          <Button
            color="dark"
            fullwidth
            onClick={onSubmit}
            disabled={!passValidation || loading}
          >
            註冊
          </Button>
          <div className={styles.serviceLicense}>
            繼續進行代表同意
            <Link href="/service-license">服務條款</Link>
          </div>
          <div className={styles.reminder}>
            已經有帳號？
            <Link href="/login">登入</Link>
          </div>
        </footer>
      </Fragment>
    </Layout>
  );
}

export default SignUp;
