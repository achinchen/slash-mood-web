import { FC, useState } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import useFetch from 'hooks/useFetch';
import Emoji from 'components/Emoji';
import Menu from 'components/Menu';
import { MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import YesNoDialog from 'components/YesNoDialog';
import EditMood from './EditMood';
import { getDateTime } from 'utils';
import type { Record } from 'types/record';
import styles from './style.module.scss';

type Props = Record;

const MoodCard: FC<Props> = ({
  id,
  mood,
  categories,
  description,
  createdTime
}) => {
  const date = getDateTime(new Date(createdTime));
  const [mode, setMode] = useState<'edit' | 'delete' | undefined>();

  const { loading, fetcher } = useFetch({
    fetchArgs: [`records/${id}`, { method: 'DELETE' }],
    onSuccess: () => window.location.reload()
  });

  return (
    <>
      <section key={id} className={styles.card}>
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
        />
      )}
    </>
  );
};

export const LoadingMoodCard = (): JSX.Element => (
  <section className={cx(styles.card, styles.loading)}>
    <img className={styles.mood} src="/images/mood/loading.svg" alt="載入中" />
    <p className={styles.text}>
      <time className={cx(styles.time, styles.loading)} />
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <span
          className={cx(styles.tag, styles.loading)}
          key={`loading-${categoryIndex}`}
        />
      ))}
    </p>
  </section>
);

export const WithoutMoodCard = (): JSX.Element => (
  <section className={styles.withoutCard}>
    <Emoji emoji="😆" aria-label="There is no mood record!" />
    還沒有任何心情紀錄唷， 點這裡<Link href="/mood/create">開始紀錄心情</Link>
  </section>
);

export default MoodCard;
