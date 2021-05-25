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

type Props = { props: RecordsResponse | undefined };

const Mood: NextPage<Props> = ({ props }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  const { data, error, size, mutate, setSize } = useSWRInfinite(
    (index) => `records?page=${index + (props ? 2 : 1)}`,
    fetch,
    {
      initialData: props && [props]
    }
  );

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

  const onMutate = (page, updatedRecord) => {
    // mutate('/records', async records => {
    //    const filteredTodos = todos.filter(todo => todo.id !== '1')
    //   return [...filteredTodos, updatedTodo]
    // })
  
  }  


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
          {records.map(({ records }, index) => (
            <Fragment key={`page-${index}`}>
              {records.map((record) => {
                return <MoodCard {...record} key={record.id} />;
              })}
            </Fragment>
          ))}

          {!isLoadingMore && <LoadingMoodCard />}
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
    return { props: result as RecordsResponse };
  } catch (e) {
    return { props: undefined };
  }
};

export default Mood;
