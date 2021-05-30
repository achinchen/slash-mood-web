import Link from 'next/link';
import Emoji from 'components/Emoji';
import styles from './style.module.scss';

const GreetingHeader = (): JSX.Element => (
  <>
    <h1 className={styles.title}>你好，今天辛苦了。</h1>
    <h2 className={styles.subtitle}>
      {`不論是開心、難過、悲傷，情緒就像是流水一樣，會來訪也會離開。
        請讓我們以紀錄代替標籤情緒好與壞 `}
      <Emoji aria-label="pencil" emoji="✏️" />
      <br />
      那麼，<Link href="/new">現在的你心情是什麼呢？</Link>
    </h2>
  </>
);

export default GreetingHeader;
