import { useState } from 'react';
import Head from 'next/head';
import type { Mood } from 'types/mood';
import { MOODS } from 'constants/mood';
import Button from 'components/Button';
import styles from './style.module.scss';

function CreateMood(): JSX.Element {
  const [currentMood, setCurrentMood] = useState<Mood>();
  const [step, setCurrentStep] = useState(0);

  const moodLabel = currentMood ? MOODS[currentMood] : '';

  const nextStep = () => setCurrentStep((step) => step + 1);

  const selectCurrentMood = (mood: Mood | undefined) => () =>
    setCurrentMood(mood);

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Mood Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <button className={styles.closeButton}>
          <img
            className={styles.closeButtonIcon}
            src="/images/icon/close.svg"
            alt="關閉"
          />
        </button>
        <h1 className={styles.title}>
          你的心情是{' '}
          <span className={styles.titleLabel} aria-label={moodLabel} />
        </h1>
      </header>
      <main className={styles.main}>
        {Object.entries(MOODS).map(([mood, text]) => (
          <button
            key={mood}
            className={styles.moodButton}
            data-mood={mood}
            onClick={selectCurrentMood(mood as Mood)}
          >
            <img
              className={styles.moodButtonIcon}
              src={`/images/mood/${mood}.svg`}
              alt={`${text}的心情`}
            />
          </button>
        ))}
      </main>
      <footer className={styles.bottom}>
        <Button disabled={!!currentMood} onClick={nextStep}>
          下一步
        </Button>
      </footer>
    </div>
  );
}

export default CreateMood;
