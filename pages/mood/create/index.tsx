import { useState, ChangeEvent, useMemo, Fragment } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import cx from 'clsx';
import { MOODS_MAP, MOODS, CATEGORIES_MAP, CATEGORIES } from 'constants/mood';
import { Category, Mood } from 'types/mood';
import query from 'utils/query';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import TextArea from 'components/TextArea';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

const MAXIMUM_CATEGORIES = 2;

function CreateMood(): JSX.Element {
  const [mood, setMood] = useState<Mood>();
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

  const moodLabel = mood ? MOODS_MAP[mood] : ' ___ ';

  const onClose = () => window.history.go(-1);

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
    <>
      <Head>
        <title>Add Mood Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <IconButton
          icon="close"
          aria-label="關閉"
          className={styles.closeButton}
          onClick={onClose}
        />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>今天的心情是？</h1>
        <section className={styles.mood}>
          {MOODS.map((m) => (
            <button
              key={m}
              className={cx(styles.moodButton, {
                [styles.unselected]: mood && mood !== m
              })}
              onClick={selectMood(m)}
            >
              <img
                className={styles.moodButtonIcon}
                src={`/images/mood/${m}.svg`}
                alt={`${MOODS_MAP[m]}的心情`}
              />
            </button>
          ))}
        </section>
        <h2 className={styles.title}>
          是什麼讓你「{moodLabel}」？
          <span className={styles.categoryRest}>{`(${
            3 - categories.length
          })`}</span>
        </h2>
        <section className={styles.category}>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              color="light"
              className={cx(styles.categoryItem, {
                [styles.selected]: categories.includes(category)
              })}
              onClick={selectCategory(category)}
              disabled={!mood}
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
        <h3 className={styles.title}>Notes</h3>
        <TextArea
          value={description}
          onChange={onDescriptionChange}
          maxLength={300}
        />
        <div className={styles.error} hidden={!isError}>
          <Emoji emoji="🥺" aria-label="Some error happened!" />
          {fetchedError}
        </div>
      </main>
      <footer className={styles.bottom}>
        <Button
          className={styles.submitButton}
          size="sm"
          color="dark"
          disabled={!mood && isLoading}
          onClick={onSubmit}
        >
          完成
        </Button>
      </footer>
    </>
  );
}

export default CreateMood;
