import { useState, ChangeEvent, useMemo, Fragment } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import cx from 'clsx';
import { MOODS_MAP, MOODS, CATEGORIES_MAP, CATEGORIES } from 'constants/mood';
import { Category, Mood } from 'types/mood';
import query from 'utils/query';
import Button from 'components/Button';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

const MAXIMUM_CATEGORIES = 2;

function CreateMood(): JSX.Element {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<Mood>(MOODS[0]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [fetchedError, setFetchedError] = useState('發生不明問題，請重試看看');

  const payload = useMemo(
    () => ({
      mood,
      categories,
      description
    }),
    [mood, categories, description]
  );

  const moodLabel = mood ? MOODS_MAP[mood] : ' ';

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const onClose = () => (step ? previousStep() : window.history.go(-1));

  const selectMood = (mood: Mood) => () => setMood(mood);

  const selectCategory = (category: Category) => () => {
    setCategories((categories) => {
      if (categories.includes(category))
        return categories.filter(
          (currentCategory) => currentCategory !== category
        );
      if (categories.length > MAXIMUM_CATEGORIES) return categories;
      return [...categories, category];
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
                data-mood={mood}
                aria-label={moodLabel}
              />
            </h1>
          </header>
          <main className={styles.main} data-step="0">
            {MOODS.map((mood) => (
              <button
                key={mood}
                className={styles.moodButton}
                data-mood={mood}
                onClick={selectMood(mood)}
              >
                <img
                  className={styles.moodButtonIcon}
                  src={`/images/mood/${mood}.svg`}
                  alt={`${MOODS_MAP[mood]}的心情`}
                />
              </button>
            ))}
          </main>
          <footer className={styles.bottom}>
            <Button color="light" size="md" disabled={!mood} onClick={nextStep}>
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
                src={`/images/mood/${mood}.svg`}
                alt={moodLabel}
              />
              <figcaption>
                {moodLabel} {mood}
              </figcaption>
            </figure>
          </header>
          <main className={styles.main} data-step="1">
            <h1 className={styles.categoryLabel}>
              是什麼讓你「{moodLabel}」？
            </h1>
            <section className={styles.categoryContainer}>
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  color="light"
                  className={cx(styles.categoryItem, {
                    [styles.selected]: categories.includes(category)
                  })}
                  onClick={selectCategory(category)}
                >
                  <Fragment>
                    <Emoji
                      className={styles.categoryButtonIcon}
                      aria-label={CATEGORIES_MAP[category].label}
                      emoji={CATEGORIES_MAP[category].emoji}
                    />
                    {CATEGORIES_MAP[category].label}
                  </Fragment>
                </Button>
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
              disabled={mood && isLoading}
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
