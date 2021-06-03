import { FC, useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import Emoji from 'components/Emoji';
import Menu from 'components/Menu';
import { MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import YesNoDialog from 'components/YesNoDialog';
import EditMood from './EditMood';
import { getDateTime } from 'utils/dateString';
import type { MoodRecord } from 'types/record';
import styles from './style.module.scss';

type Props = {
  onUpdate: (updatedRecord?: MoodRecord) => void;
} & MoodRecord;

const MoodCard: FC<Props> = ({
  id,
  mood,
  categories,
  description,
  createdTime,
  updatedTime,
  onUpdate
}) => {
  const date = getDateTime(new Date(createdTime));
  const [mode, setMode] = useState<'edit' | 'delete' | undefined>();

  const { loading, fetcher } = useFetch({
    fetchArgs: [`records/${id}`, { method: 'DELETE' }],
    onSuccess: () => {
      onUpdate(undefined);
    }
  });

  useEffect(() => {
    setMode(undefined);
  }, [updatedTime]);

  return (
    <>
      <section className={styles.card}>
        <img
          className={styles.mood}
          src={`/images/mood/${mood}.svg`}
          alt={`${MOODS_MAP[mood]}`}
        />
        <p>
          <time className={styles.time}>{date}</time>
          {categories.map((category) => (
            <Emoji
              className={styles.tag}
              key={`${id}-${category}`}
              emoji={CATEGORIES_MAP[category].emoji}
              aria-label={CATEGORIES_MAP[category].label}
            />
          ))}
        </p>
        <Menu
          id={String(id)}
          menuLabel="編輯功能選單"
          editLabel="編輯心情紀錄"
          deleteLabel="刪除心情紀錄"
          onEdit={() => setMode('edit')}
          onDelete={() => setMode('delete')}
          disabled={loading}
        />
      </section>
      {mode === 'delete' && (
        <YesNoDialog withCancel isActiveClose onConfirm={fetcher}>
          {`確認刪除 ${date} 紀錄嗎？`}
        </YesNoDialog>
      )}
      {mode === 'edit' && (
        <EditMood
          id={id}
          mood={mood}
          categories={categories}
          description={description}
          onUpdate={onUpdate}
          updatedTime={updatedTime}
        />
      )}
    </>
  );
};

export default MoodCard;
