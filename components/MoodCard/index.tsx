import { FC } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import { useQuery } from 'react-query';
import Emoji from 'components/Emoji';
import Menu from 'components/Menu';
import { MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import { triggerYesNoDialog } from 'components/YesNoDialog';
import { getDateTime } from 'utils';
import query from 'utils/query';
import type { Record } from 'types/record';
import styles from './style.module.scss';

type Props = Record;

const MoodCard: FC<Props> = ({ id, mood, categories, createdTime }) => {
  const date = getDateTime(new Date(createdTime));

  const { isLoading, refetch: deleteRecord } = useQuery(
    `deleteRecord-${id}`,
    query(`/records/${id}`, { method: 'DELETE' }),
    {
      enabled: false,
      retry: false,
      onSuccess: () => window.location.reload()
    }
  );

  const onDelete = () => {
    triggerYesNoDialog({
      withCancel: true,
      isActiveClose: true,
      children: `確認刪除 ${date} 紀錄嗎？`,
      onConfirm: deleteRecord
    });
  };
  return (
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
        id={`${id}`}
        menuLabel="編輯功能選單"
        editLabel="編輯心情紀錄"
        deleteLabel="刪除心情紀錄"
        onEdit={() => {
          console.log();
        }}
        disabled={isLoading}
        onDelete={onDelete}
      />
    </section>
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
