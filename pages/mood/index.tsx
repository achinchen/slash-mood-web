import { useRef, useMemo, Fragment } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { paginationQuery, fetchInitialData } from 'utils/query';
import { getDateString } from 'utils';
import { Record, PaginationResult } from 'types/record';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import MoodCard, {
  LoadingMoodCard,
  WithoutMoodCard
} from 'components/MoodCard';
import styles from './style.module.scss';

type Records = { records: Record[]; date: string } & PaginationResult;
type CacheRecords = {
  pageParams: number[] | undefined[];
  pages: Records[];
};
type Props = { props: Records | undefined };

const Mood: NextPage<Props> = ({ props }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  const dateString = getDateString(new Date());
  const queryClient = useQueryClient();

  const initialDataFromCache = useMemo(() => {
    const cacheRecords = queryClient.getQueryData(['record', dateString]) as
      | CacheRecords
      | undefined;
    if (cacheRecords) return cacheRecords;

    if (props)
      return {
        pages: [props],
        pageParams: [1]
      };
  }, [props, dateString, queryClient]);

  const queryRecords = paginationQuery(`/records`);

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery<PaginationResult & { records: Record[] }, Error>(
    ['record', dateString],
    queryRecords,
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
      <main className={styles.main}>
        {data?.pages.map(({ page, records }) => (
          <Fragment key={`page-${page}`}>
            {records.map((record) => {
              return <MoodCard {...record} key={record.id} />;
            })}
          </Fragment>
        ))}
        {isFetchingNextPage && <LoadingMoodCard />}
      </main>
      {!data?.pages[0].records.length && <WithoutMoodCard />}
      <div className={styles.loadMoreRef} ref={loadMoreButtonRef} />
      <button className={styles.addMoodButton} onClick={addMood}>
        <img
          className={styles.addMoodButtonIcon}
          src="/images/icon/plus.svg"
          alt="增加心情紀錄"
        />
      </button>
    </div>
  );
};

Mood.getInitialProps = async () => {
  const date = getDateString(new Date());
  try {
    const result = await fetchInitialData(`/records?date=${date}`);
    if (result instanceof Error) throw result;

    return { props: result as Records };
  } catch (e) {
    return { props: undefined };
  }
};

export default Mood;
