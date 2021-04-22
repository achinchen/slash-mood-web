import { FC } from 'react';
import cx from 'clsx';
import { CATEGORIES, MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
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

export const MoodCardPlaceholder = (): JSX.Element => (
  <section className={cx(styles.card, styles.placeholder)}>
    <img
      className={styles.mood}
      src="/images/mood/placeholder.svg"
      alt="載入中"
    />
    <p>
      <time className={cx(styles.time, styles.placeholder)} />
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <span
          className={cx(styles.tag, styles.placeholder)}
          key={`placeholder-${categoryIndex}`}
        />
      ))}
    </p>
  </section>
);

export default MoodCard;
