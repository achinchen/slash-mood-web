import { useRef, Fragment, FC } from 'react';
import type { MoodRecord } from 'types/record';
import { useRecordList, Parameters } from './hooks';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import EmptyPlaceholder from '../EmptyPlaceholder';
import MoodCard, { LoadingMoodCard } from '../MoodCard';
import styles from './style.module.scss';

const RecordList: FC<Parameters> = ({ initialData }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);
  const {
    records,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    onMutate
  } = useRecordList({
    initialData
  });

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    onIntersect: () => setSize(size + 1),
    enabled: !isLoadingMore && !isReachingEnd
  });

  const onUpdate = (...args: [number, number]) => (
    updatedRecord?: MoodRecord
  ) => onMutate(...args, updatedRecord);

  return (
    <>
      {isEmpty ? (
        <EmptyPlaceholder />
      ) : (
        <main className={styles.main}>
          {records?.map(({ records }, page) => (
            <Fragment key={`page-${page}`}>
              {records.map((record, index) => (
                <MoodCard
                  {...record}
                  onUpdate={onUpdate(page, index)}
                  key={`${record.id}-${record.updatedTime}`}
                />
              ))}
            </Fragment>
          ))}
          {isLoadingMore && <LoadingMoodCard />}
        </main>
      )}
      <div className={styles.loadMoreRef} ref={loadMoreButtonRef} />
    </>
  );
};

export default RecordList;
