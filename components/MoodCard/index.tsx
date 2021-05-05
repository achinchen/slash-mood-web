import { FC } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import Emoji from '../Emoji';
import Menu from '../Menu';
import { MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import type { Record } from 'types/record';
import styles from './style.module.scss';

type Props = {
  // onUpdate
} & Record;

const MoodCard: FC<Props> = ({ id, mood, categories, createdTime }) => {
  return (
    <section key={id} className={styles.card}>
      <img
        className={styles.mood}
        src={`/images/mood/${mood}.svg`}
        alt={`${MOODS_MAP[mood]}`}
      />
      <p>
        <time className={styles.time}>{new Date(createdTime).getDate()}</time>
        {categories.map((category) => (
          <span
            className={styles.tag}
            key={`${id}-${category}`}
            data-label={category}
          >
            <Emoji
              emoji={CATEGORIES_MAP[category].emoji}
              aria-label={CATEGORIES_MAP[category].label}
            />
            {CATEGORIES_MAP[category].label}
          </span>
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
        onDelete={() => {
          console.log();
        }}
      />
    </section>
  );
};

export const LoadingMoodCard = (): JSX.Element => (
  <section className={cx(styles.card, styles.loading)}>
    <img className={styles.mood} src="/images/mood/loading.svg" alt="載入中" />
    <p>
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
