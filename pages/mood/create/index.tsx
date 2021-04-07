import { useState, ChangeEvent, useMemo } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import cx from 'clsx';
import { MOODS, MOOD, CATEGORIES } from 'constants/mood';
import query from 'utils/query';
import Button from 'components/Button';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

function CreateMood(): JSX.Element {
  const [step, setStep] = useState(0);
  const [moodIndex, setMoodIndex] = useState<number>();
  const [categories, setCategories] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [fetchedError, setFetchedError] = useState('發生不明問題，請重試看看');

  const payload = useMemo(
    () => ({
      mood: moodIndex,
      categories: categories,
      description
    }),
    [moodIndex, categories, description]
  );

  const moodLabel = moodIndex !== undefined ? MOODS[MOOD[moodIndex]] : ' ';

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const onClose = () => (step ? previousStep() : window.history.go(-1));

  const selectMood = (mood: number | undefined) => () => setMoodIndex(mood);

  const selectCategory = (index: number) => () => {
    setCategories((categories) => {
      if (categories.includes(index))
        return categories.filter((i) => i !== index);
      return [...categories, index];
    });
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const { isLoading, isError, refetch } = useQuery(
    'records',
    query('/records', { method: 'POST', payload }),
    {
      enabled: false,
      retry: false,
      onError: () => {
        setFetchedError('發生不明問題，請重試看看');
      },
      onSuccess: () => {
        setFetchedError('');
        window.location.assign('/mood');
      }
    }
  );

  const onSubmit = () => refetch();

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
                data-mood={MOOD[moodIndex as number]}
                aria-label={moodLabel}
              />
            </h1>
          </header>
          <main className={styles.main} data-step="0">
            {Object.entries(MOODS).map(([mood, text], index) => (
              <button
                key={mood}
                className={styles.moodButton}
                data-mood={mood}
                onClick={selectMood(index)}
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
              disabled={!moodIndex}
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
                src={`/images/mood/${MOOD[moodIndex as number]}.svg`}
                alt={moodLabel}
              />
              <figcaption>
                {moodLabel} {MOOD[moodIndex as number]}
              </figcaption>
            </figure>
          </header>
          <main className={styles.main} data-step="1">
            <h1 className={styles.categoryLabel}>
              是什麼讓你「{moodLabel}」？
            </h1>
            <section className={styles.categoryContainer}>
              {Object.entries(CATEGORIES).map(([category, label], index) => (
                <button
                  key={category}
                  className={cx(styles.categoryItem, {
                    [styles.selected]: categories.includes(index)
                  })}
                  onClick={selectCategory(index)}
                >
                  <span className={styles.categoryButton}>
                    <img
                      className={styles.categoryButtonIcon}
                      src={`/images/category/${category}.svg`}
                      alt={label}
                    />
                  </span>
                  {label}
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
            <div className={styles.error} hidden={!isError}>
              <Emoji emoji="🥺" aria-label="Some error happened!" />
              {fetchedError}
            </div>
          </main>
          <footer className={styles.bottom}>
            <Button
              size="sm"
              color="light"
              onClick={previousStep}
              disabled={isLoading}
            >
              上一步
            </Button>
            <Button
              className={styles.submitButton}
              size="sm"
              color="dark"
              disabled={moodIndex === undefined && isLoading}
              onClick={onSubmit}
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
