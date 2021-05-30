import { useState, Fragment, ChangeEvent } from 'react';
import cx from 'clsx';
import { MOODS_MAP, MOODS, CATEGORIES_MAP, CATEGORIES } from 'constants/mood';
import BasicHead from 'src/heads/Head';
import useFetch from 'hooks/useFetch';
import useMood from 'hooks/useMood';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import TextArea from 'components/TextArea';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

function CreateMood(): JSX.Element {
  const [fetchedError, setFetchedError] = useState('');

  const {
    onMood,
    onCategories,
    onDescription,
    mood,
    categories,
    description
  } = useMood();

  const moodLabel = mood ? MOODS_MAP[mood] : ' ___ ';

  const onClose = () => window.history.go(-1);

  const { loading, fetcher } = useFetch({
    fetchArgs: [
      'records',
      {
        method: 'POST',
        payload: {
          mood,
          categories,
          description
        }
      }
    ],
    onError: () => {
      setFetchedError('發生不明問題，請重試看看');
    },
    onSuccess: () => {
      setFetchedError('');
      window.location.replace('/mood');
    }
  });

  const onSubmit = () => fetcher();

  return (
    <>
      <BasicHead title="今天心情是什麼呢？" />
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
              onClick={() => onMood(m)}
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
              onClick={() => onCategories(category)}
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
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onDescription(e.target.value)
          }
          maxLength={300}
        />
      </main>
      <footer className={styles.bottom}>
        <div className={styles.error} aria-hidden={!fetchedError}>
          <Emoji emoji="🥺" aria-label="Some error happened!" />
          {fetchedError}
        </div>
        <Button
          className={styles.submitButton}
          size="sm"
          color="dark"
          disabled={!mood && loading}
          onClick={onSubmit}
        >
          完成
        </Button>
      </footer>
    </>
  );
}

export default CreateMood;
