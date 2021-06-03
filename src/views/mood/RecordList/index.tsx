import { useRef, Fragment, FC, useState, useEffect } from 'react';
import type { MoodRecordsResponse, MoodRecord } from 'types/record';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import fetcher from 'libs/fetch';
import EmptyPlaceholder from '../EmptyPlaceholder';
import MoodCard from '../MoodCard';
import LoadingCard from '../LoadingCard';
import styles from './style.module.scss';

type Props = { initialData?: MoodRecordsResponse };

const RecordList: FC<Props> = ({ initialData }) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);
  const [records, setRecords] = useState<MoodRecordsResponse[]>(
    initialData ? [initialData] : []
  );
  const [queryPage, setQueryPage] = useState(initialData ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const empty = !records?.length;
  const ended = empty || records?.[records.length - 1]?.hasNext === false;

  useEffect(() => {
    const queryRecord = async () => {
      setLoading(true);
      try {
        const result = (await fetcher(
          `records?page=${queryPage}`
        )) as MoodRecordsResponse;
        if (result) setRecords((records) => [...records, result]);
      } catch (error) {}

      setLoading(false);
    };

    queryRecord();
  }, [queryPage]);

  useIntersectionObserver({
    targetRef: loadMoreButtonRef,
    onIntersect: () => setQueryPage((page) => page + 1),
    enabled: !loading && !ended
  });

  const onUpdate = (page: number, index: number) => (
    updatedRecord?: MoodRecord
  ) => {
    setRecords((records) => {
      const updatedPageRecords = [...records[page].records];
      if (updatedRecord) {
        updatedPageRecords[index] = updatedRecord;
      } else {
        updatedPageRecords.splice(index, 1);
      }

      records[page] = {
        hasNext: records[page].hasNext,
        records: updatedPageRecords
      };
      return records;
    });
  };

  return (
    <>
      {empty ? (
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
          {loading && <LoadingCard />}
        </main>
      )}
      <div className={styles.loadMoreRef} ref={loadMoreButtonRef} />
    </>
  );
};

export default RecordList;
