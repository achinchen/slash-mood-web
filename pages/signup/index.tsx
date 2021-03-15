import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import styles from './style.module.scss';

function SignUp(): JSX.Element {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [finishedRecaptchaCallback, setFinishedRecaptchaCallback] = useState(
    false
  );
  const [recaptcha, setRecaptcha] = useState('');

  const onClose = () => window.location.assign('somewhere');

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    window['onLoadRecaptcha'] = () => {
      window.grecaptcha.render(recaptchaRef.current!, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: (response: string) => setRecaptcha(response)
      });
    };
    setFinishedRecaptchaCallback(true);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Mood Log</title>
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
            value={nickname}
            onValueChange={setNickname}
            label="暱稱"
            name="current-name"
            autoComplete="current-name"
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
        <div className={styles.recaptcha} ref={recaptchaRef} />
        <footer className={styles.bottom}>
          <Button color="dark" fullwidth>
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
      </main>
    </div>
  );
}

export default SignUp;