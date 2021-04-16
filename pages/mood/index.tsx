import Head from 'next/head';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { paginationQuery } from 'utils/query';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import MoodCards from 'components/MoodCards';
import { Record, PaginationResult } from 'types/record';
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

type Props = {};

const Mood: NextPage<Props> = ({ date, initialRecord }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);
  const [currentDate] = useState(new Date(date));

  const setMonth = (direction: 'previous' | 'next') => () => {
    currentDate.setUTCMonth(
      currentDate.getDay() + (direction === 'next' ? 1 : -1)
    );
    window.location.assign(`/mood/${currentDate.toJSON()}`);
  };

  const query = paginationQuery(`/records?date=${currentDate.toJSON()}`);

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery<PaginationResult & { records: Record[] }, Error>(
    `record-${currentDate.toISOString()}`,
    query,
    {
      retry: 0,
      getNextPageParam: (lastPage) => lastPage && lastPage.nextPage
    }
  );

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage
  });

  const addMood = () => window.location.assign('/mood/create');

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <button className={styles.arrowButton} onClick={setMonth('previous')}>
          <img
            className={styles.arrowButtonIcon}
            src="/images/icon/arrow-left.svg"
            alt="選擇前一個月"
          />
        </button>
        <h1 className={styles.title}>
          {MONTHS[date.getMonth()]}, {date.getFullYear()}
        </h1>
        <button className={styles.arrowButton} onClick={setMonth('next')}>
          <img
            className={styles.arrowButtonIcon}
            src="/images/icon/arrow-right.svg"
            alt="選擇前一個月"
          />
        </button>
      </header>
      {/* <MoodCards moodList={undefined} /> */}
      <button className={styles.addMoodButton} onClick={addMood}>
        <img
          className={styles.addMoodButtonIcon}
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
};

export default Mood;
