import { useSWRInfinite } from 'swr';
import fetch from 'libs/fetch';
import type { MoodRecordsResponse, MoodRecord } from 'types/record';

export type Parameters = { initialData?: MoodRecordsResponse };
type Returns = {
  records?: MoodRecordsResponse[];
  size: number;
  setSize: (size: number) => void;
  isEmpty: boolean;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
  onMutate: (
    page: number,
    index: number,
    updatedRecordResponse?: MoodRecord
  ) => void;
};

const getKey = (index: number, previous?: unknown) => {
  const previousData = previous as MoodRecordsResponse;
  if (previousData && !previousData?.hasNext) return null;
  return `records?page=${index + 1}`;
};

export function useRecordList({ initialData }: Parameters): Returns {
  const { data, error, mutate, size, setSize } = useSWRInfinite(getKey, fetch, {
    initialData: initialData && [initialData]
  });

  const records = data as MoodRecordsResponse[];

  const isLoadingInitialData = !records && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && records && typeof records[size - 1] === 'undefined');

  const isEmpty = !records?.length;
  const hasNextPage = records?.[size - 1]?.hasNext;

  const isReachingEnd = isEmpty || !hasNextPage;

  const onMutate: Pick<Returns, 'onMutate'>['onMutate'] = (
    page,
    index,
    updatedRecord
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

  return {
    records,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    onMutate
  };
}
