import Link from 'next/link';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

const WithoutMoodCard = (): JSX.Element => (
  <main className={styles.withoutCard}>
    <Emoji emoji="😆" aria-label="There is no mood record!" />
    還沒有任何心情紀錄唷， 點這裡<Link href="/new">開始紀錄心情</Link>
  </main>
);

export default WithoutMoodCard;
