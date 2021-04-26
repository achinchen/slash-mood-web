import { FC } from 'react';
import Link from 'next/link';
import cx from 'clsx';
import Emoji from '../Emoji';
import { MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import type { Record } from 'types/record';
import styles from './style.module.scss';

type Props = Record;

const MoodCard: FC<Props> = ({ id, mood, categories, createdTime }) => (
  <section key={id} className={styles.card}>
    <img
      className={styles.mood}
      src={`/images/mood/${mood}.svg`}
      alt={`${MOODS_MAP[mood]}`}
    />
    <p>
      <time className={styles.time}>
        {new Date(createdTime).toDateString()}
      </time>
      {categories.map((category) => (
        <span
          className={styles.tag}
          key={`${id}-${category}`}
          data-label={category}
        >
          {CATEGORIES_MAP[category]}
        </span>
      ))}
    </p>
  </section>
);

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
