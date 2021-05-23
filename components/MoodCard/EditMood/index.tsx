import { FC, ChangeEvent } from 'react';
import cx from 'clsx';
import Modal from 'components/Modal';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import Emoji from 'components/Emoji';
import { MOODS, CATEGORIES, MOODS_MAP, CATEGORIES_MAP } from 'constants/mood';
import useMood, { Parameters } from '../hooks';
import styles from './style.module.scss';

type Props = {
  onUpdate: (payload: Parameters) => void;
  close?: () => void;
} & Parameters;

const EditMood: FC<Props> = ({ onUpdate, close, ...payload }) => {
  const {
    onMood,
    onCategories,
    onDescription,
    mood,
    categories,
    description
  } = useMood(payload);
  console.log(categories);

  const onSubmit = () => {
    onUpdate({ mood, categories, description });
    close?.();
  };

  return (
    <Modal>
      <>
        <h3 className={styles.title}>心情</h3>
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
        <h3 className={styles.title}>
          跟什麼相關
          <span className={styles.categoryRest}>{`(${
            3 - categories.length
          })`}</span>
        </h3>
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
              <Emoji
                className={styles.categoryButtonIcon}
                aria-label={CATEGORIES_MAP[category].label}
                emoji={CATEGORIES_MAP[category].emoji}
              />
              {CATEGORIES_MAP[category].label}
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
        <footer className={styles.bottom}>
          <Button
            className={styles.submitButton}
            size="sm"
            color="dark"
            disabled={!mood}
            onClick={onSubmit}
          >
            完成
          </Button>
        </footer>
      </>
    </Modal>
  );
};

export default EditMood;
