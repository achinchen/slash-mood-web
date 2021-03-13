import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import type { Category, Mood } from 'types/mood';
import { MOODS, MOOD, CATEGORIES } from 'constants/mood';
import Button from 'components/Button';
import styles from './style.module.scss';

function CreateMood(): JSX.Element {
  const [step, setStep] = useState(0);
  const [currentMood, setCurrentMood] = useState<Mood>();
  const [category, setCategory] = useState<Category>();
  const [description, setDescription] = useState('');

  const moodLabel = currentMood ? MOODS[currentMood] : ' ';

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const onClose = () => {
    if (step) setStep(step - 1);
    window.history.go(-1);
  };

  const selectMood = (mood: Mood | undefined) => () => setCurrentMood(mood);

  const selectCategory = (category: Category | undefined) => () =>
    setCategory(category);

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Mood Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {step === 0 && (
        <>
          <header className={styles.header}>
            <button className={styles.closeButton} onClick={onClose}>
              <img
                className={styles.closeButtonIcon}
                src="/images/icon/close.svg"
                alt="關閉"
              />
            </button>
            <h1 className={styles.title}>
              你的心情是{' '}
              <span
                className={styles.titleLabel}
                data-mood={currentMood || ''}
                aria-label={moodLabel}
              />
            </h1>
          </header>
          <main className={styles.main} data-step="0">
            {Object.entries(MOODS).map(([mood, text]) => (
              <button
                key={mood}
                className={styles.moodButton}
                data-mood={mood}
                onClick={selectMood(mood as Mood)}
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
            <Button
              color="light"
              size="md"
              disabled={!currentMood}
              onClick={nextStep}
            >
              下一步
            </Button>
          </footer>
        </>
      )}
      {step === 1 && (
        <>
          <header className={styles.header}>
            <button className={styles.closeButton} onClick={onClose}>
              <img
                className={styles.closeButtonIcon}
                src="/images/icon/close.svg"
                alt="關閉"
              />
            </button>
            <figure className={styles.moodFigure}>
              <img
                className={styles.moodFigureSource}
                src={`/images/mood/${currentMood}.svg`}
                alt={moodLabel}
              />
              <figcaption>
                {moodLabel} {currentMood}
              </figcaption>
            </figure>
          </header>
          <main className={styles.main} data-step="1">
            <h1 className={styles.categoryLabel}>
              是什麼讓你「{moodLabel}」？
            </h1>
            <section className={styles.categoryContainer}>
              {Object.entries(CATEGORIES).map(([category, text]) => (
                <button
                  key={category}
                  className={styles.categoryItem}
                  onClick={selectCategory(category as Category)}
                >
                  <span className={styles.categoryButton}>
                    <img
                      className={styles.categoryButtonIcon}
                      src={`/images/category/${category}.svg`}
                      alt={text}
                    />
                  </span>
                  {text}
                </button>
              ))}
            </section>
            <label className={styles.notes}>
              Notes
              <textarea
                value={description}
                onChange={onDescriptionChange}
                className={styles.notesTextarea}
                maxLength={300}
              />
            </label>
          </main>
          <footer className={styles.bottom}>
            <Button size="sm" color="light" onClick={previousStep}>
              上一步
            </Button>
            <Button
              className={styles.submitButton}
              size="sm"
              color="dark"
              disabled={!!currentMood}
              onClick={nextStep}
            >
              完成
            </Button>
          </footer>
        </>
      )}
    </div>
  );
}

export default CreateMood;
