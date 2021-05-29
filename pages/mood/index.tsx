import { useRef, Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { NextPage } from 'next';
import { useSWRInfinite } from 'swr';
import fetch from 'libs/fetch';
import type { Record } from 'types/record';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import MoodCard, {
  LoadingMoodCard,
  WithoutMoodCard
} from 'components/MoodCard';
import styles from './style.module.scss';

type RecordsResponse = {
  records: Record[];
  hasNext: boolean;
};

type Props = { initialData?: RecordsResponse };

const getKey = (index: number, previous?: unknown) => {
  const previousData = previous as RecordsResponse;
  if (previousData && !previousData?.hasNext) return null;
  return `records?page=${index + 1}`;
};

const Mood: NextPage<Props> = ({ initialData }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  const { data, error, mutate, size, setSize } = useSWRInfinite(getKey, fetch, {
    initialData: initialData && [initialData]
  });

  const records = data as RecordsResponse[];

  const isLoadingInitialData = !records && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && records && typeof records[size - 1] === 'undefined');
  const isEmpty = !records?.length;
  const hasNextPage = records?.[size - 1]?.hasNext;
  const isReachingEnd = isEmpty || !hasNextPage;

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    onIntersect: () => setSize(size + 1),
    enabled: !isLoadingMore && !isReachingEnd
  });

  const addMood = () => Router.replace('/mood/create');

  const onMutate = (page: number, index: number) => (
    updatedRecord?: Record
  ) => {
    const updatedRecordResponse = records;
    const currentPageRecordsResponse = updatedRecordResponse[page];

    const updatedRecords = [...currentPageRecordsResponse.records];
    if (updatedRecord) {
      updatedRecords[index] = updatedRecord;
    } else {
      updatedRecords.splice(index, 1);
    }
    updatedRecordResponse[page].records = updatedRecords;
    mutate(updatedRecordResponse, true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isEmpty ? (
        <WithoutMoodCard />
      ) : (
        <main className={styles.main}>
          {records?.map(({ records }, page) => (
            <Fragment key={`page-${page}`}>
              {records.map((record, index) => (
                <MoodCard
                  {...record}
                  onUpdate={onMutate(page, index)}
                  key={`${record.id}-${record.updatedTime}`}
                />
              ))}
            </Fragment>
          ))}
          {isLoadingMore && <LoadingMoodCard />}
        </main>
      )}
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
  try {
    const result = await fetch('records?page=1');
    if (result instanceof Error) throw result;
    return { initialData: result as RecordsResponse };
  } catch (e) {
    return { initialData: undefined };
  }
};

export default Mood;
