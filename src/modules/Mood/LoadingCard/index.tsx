import styles from './style.module.scss';

const LoadingCard = (): JSX.Element => (
  <section className={styles.card}>
    <img className={styles.mood} src="/images/mood/loading.svg" alt="載入中" />
    <p className={styles.text}>
      <time className={styles.time} />
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <span className={styles.tag} key={`loading-${categoryIndex}`} />
      ))}
    </p>
  </section>
);

export default LoadingCard;
