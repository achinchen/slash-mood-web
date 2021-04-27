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
      <time className={styles.time}>{new Date(createdTime).getDate()}</time>
      {categories.map((category) => (
        <span
          className={styles.tag}
          key={`${id}-${category}`}
          data-label={category}
        >
          {CATEGORIES_MAP[category]}
        </span>
      ))}
      <div className={styles.menu}>
        {/* <IconButton
          id={MENU_BUTTON_ID}
          aria-haspopup
          aria-label={`${label}功能選單`}
          iconOnClass="ellipsis-ios-regular"
          color="transparent"
          onClick={() => {
            setIsExpanded((shown) => !shown);
          }}
        />
        <div
          role="menu"
          tabIndex={isExpanded ? 0 : -1}
          aria-labelledby={MENU_BUTTON_ID}
          className={`${styles.menuOptions} ${
            isExpanded ? styles.triggered : ''
          }`}
          ref={setRef}
        >
          <Button
            styleType="outlined"
            style={{ border: 'none' }}
            color="secondary"
            size="sm"
            role="menuitem"
            aria-label={`編輯${label}`}
            disabled={isPending}
            onClick={onEdit}
          >
            編輯
          </Button>
          <Button
            styleType="outlined"
            style={{ border: 'none' }}
            color="secondary"
            size="sm"
            role="menuitem"
            aria-label={`刪除${label}`}
            disabled={isPending}
            onClick={() => {
              onDelete();
            }}
          >
            刪除
          </Button> */}
        {/* </div> */}
      </div>
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
