import { useRef, useState, useMemo, Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { paginationQuery, fetchInitialData } from 'utils/query';
import { getDateString } from 'utils';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Record, PaginationResult } from 'types/record';
import MoodCard, {
  LoadingMoodCard,
  WithoutMoodCard
} from 'components/MoodCard';
import IconButton from 'components/IconButton';
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

type Records = { records: Record[]; date: string } & PaginationResult;
type CacheRecords = {
  pageParams: number[] | undefined[];
  pages: Records[];
};
type Props = Records | undefined;

const Mood: NextPage<Props> = (props) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState(new Date(props.date));
  const [initialRecords, setInitialRecord] = useState<Record[] | undefined>(
    props.records
  );

  const dateString = getDateString(date);
  const queryClient = useQueryClient();
  const initialDataFromCache = useMemo(() => {
    const cacheRecords = queryClient.getQueryData(['record', dateString]) as
      | CacheRecords
      | undefined;
    if (cacheRecords) return cacheRecords;

    if (dateString === props.date && props.records)
      return {
        pages: [props],
        pageParams: [1]
      };
  }, [props, dateString, queryClient]);

  const query = paginationQuery(
    `/records?date=${dateString}`,
    initialRecords ? 2 : 1
  );

  const setMonth = (direction: 'previous' | 'next') => () => {
    setDate((date) => {
      date.setMonth(date.getMonth() + (direction === 'next' ? 1 : -1));
      return new Date(date);
    });
    setInitialRecord(undefined);
  };

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery<PaginationResult & { records: Record[] }, Error>(
    ['record', dateString],
    query,
    {
      retry: 0,
      initialData: initialDataFromCache,
      getNextPageParam: (lastPage) => lastPage && lastPage.nextPage,
      enabled:
        !initialDataFromCache ||
        !!initialDataFromCache.pages[initialDataFromCache.pages.length - 1]
          .nextPage
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
        <IconButton
          aria-label="選擇前一個月"
          icon="arrow-left"
          onClick={setMonth('previous')}
        />
        <h1 className={styles.title}>
          {MONTHS[date.getMonth()]}, {date.getFullYear()}
        </h1>
        <IconButton
          aria-label="選擇後一個月"
          icon="arrow-right"
          onClick={setMonth('next')}
        />
      </header>
      <main className={styles.main}>
        {data?.pages.map(({ page, records }) => (
          <Fragment key={`page-${page}`}>
            {records.map((record) => (
              <MoodCard {...record} key={record.id} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && <LoadingMoodCard />}
      </main>
      {!initialRecords && <WithoutMoodCard />}
      <div className={styles.loadMoreRef} ref={loadMoreButtonRef} />
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

Mood.getInitialProps = async () => {
  const date = getDateString(new Date());
  const result = await fetchInitialData(`/records?date=${date}`);
  return result instanceof Error ? undefined : (result as Records);
};

export default Mood;
