import { FC } from 'react';
import { CATEGORIES } from 'constants/mood';
import { Mood, Category } from 'types/mood';
import styles from './style.module.scss';

type Props = {
  moodList: { time: string; categories: Category[]; mood: Mood }[];
};

const MoodCards: FC<Props> = ({ moodList }) => (
  <main className={styles.main}>
    {moodList.map(({ time, mood, categories }) => (
      <section key={`${time}-${mood}`} className={styles.card}>
        <img
          className={styles.mood}
          src={`/images/mood/${mood}.svg`}
          alt={`${mood}`}
        />
        <p>
          <time className={styles.time}>{time}</time>
          {categories.map((category) => (
            <span
              className={styles.tag}
              key={`${time}-${category}`}
              data-label={category}
            >
              {CATEGORIES[category]}
            </span>
          ))}
        </p>
      </section>
    ))}
  </main>
);

export default MoodCards;
