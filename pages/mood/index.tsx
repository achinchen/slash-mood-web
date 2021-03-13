import Head from 'next/head';
import MoodCards from 'components/MoodCards';
import { Category } from 'types/mood';
import { MOOD } from 'constants/mood';
import styles from './style.module.scss';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const generateMockMood = (length: number) => {
  return Array.from({ length }, (_, index) => ({
    time: `${String(index + 1).padStart(2, '0')} 星期三 ${String(
      index * 3 + Math.floor(Math.random() * 10)
    ).padStart(2, '0')}:00`,
    categories: ['work', 'home'] as Category[],
    mood: MOOD[(index + Math.floor(Math.random() * 10)) % MOOD.length]
  }));
};

const moock = generateMockMood(4);
function Mood(): JSX.Element {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <button className={styles.arrowButton}>
          <img
            className={styles.arrowButtonIcon}
            src="/images/icon/arrow-left.svg"
            alt="選擇前一個月"
          />
        </button>
        <h1 className={styles.title}>
          {MONTHS[month]}, {year}
        </h1>
        <button className={styles.arrowButton}>
          <img
            className={styles.arrowButtonIcon}
            src="/images/icon/arrow-right.svg"
            alt="選擇前一個月"
          />
        </button>
      </header>
      <MoodCards moodList={moock} />
      <button className={styles.addButton}>
        <img
          className={styles.addButtonIcon}
          src="/images/icon/plus.svg"
          alt="增加心情紀錄"
        />
      </button>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @achin
        </a>
      </footer>
    </div>
  );
}

export default Mood;
