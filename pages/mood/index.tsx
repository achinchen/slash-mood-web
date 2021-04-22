import { useRef, Fragment } from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { useInfiniteQuery } from 'react-query';
import { paginationQuery, getInitialPaginationQuery } from 'utils/query';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Record, PaginationResult } from 'types/record';
import MoodCard from 'components/MoodCard';
import styles from './style.module.scss';
import { useState } from 'react';
import { MoodCardPlaceholder } from 'components/MoodCard';

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

type InitialRecord = { records: Record[] } & PaginationResult;
type Props = {
  initialRecord: InitialRecord;
  date: Date;
};

const Mood: NextPage<Props> = ({ date, initialRecord }) => {
  const [currentDate] = useState(new Date(date));
  const query = paginationQuery(`/records?date=${currentDate.toJSON()}`);

  const setMonth = (direction: 'previous' | 'next') => () => {
    date.setUTCMonth(date.getDay() + (direction === 'next' ? 1 : -1));
    window.location.assign(`/mood/${date}`);
  };

  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  const {
    data,
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
          {MONTHS[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h1>
        <button className={styles.arrowButton} onClick={setMonth('next')}>
          <img
            className={styles.arrowButtonIcon}
            src="/images/icon/arrow-right.svg"
            alt="選擇前一個月"
          />
        </button>
      </header>
      <main className={styles.main}>
        {initialRecord.records.map((record) => (
          <MoodCard {...record} key={record.id} />
        ))}
        {data?.pages.map(({ page, records }) => (
          <Fragment key={`page-${page}`}>
            {records.map((record) => (
              <MoodCard {...record} key={record.id} />
            ))}
          </Fragment>
        ))}
        <div ref={loadMoreButtonRef} />
        {isFetchingNextPage && <MoodCardPlaceholder />}
      </main>
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

Mood.getInitialProps = async (ctx: NextPageContext) => {
  const dateQuery =
    typeof ctx.query?.date === 'string' ? ctx.query?.date : '2021-04-15';

  const date = new Date(dateQuery);
  const result = await getInitialPaginationQuery(
    `/records?date=${date.toJSON()}`
  );

  return { initialRecord: result as InitialRecord, date };
};

export default Mood;
