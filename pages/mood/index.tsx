import { useRef, Fragment } from 'react';
import type { NextPage } from 'next';
import type { Record } from 'types/record';
import { useSWRInfinite } from 'swr';
import fetch from 'libs/fetch';
import BasicHead from 'src/heads/Head';
import Emoji from 'components/Emoji';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import MoodCard, {
  LoadingMoodCard,
  WithoutMoodCard
} from 'src/modules/Mood/MoodCard';
import styles from './style.module.scss';
import Link from 'next/link';

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
      <BasicHead title="日日安" />
      <h1 className={styles.title}>你好，今天辛苦了。</h1>
      <h2 className={styles.subtitle}>
        {`不論是開心、難過、悲傷，情緒就像是流水一樣，會來訪也會離開。
        請讓我們以紀錄代替標籤情緒好與壞 `}
        <Emoji aria-label="pencil" emoji="✏️" />
        <br />
        那麼，<Link href="/mood/create">現在的你心情是什麼呢？</Link>
      </h2>
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
