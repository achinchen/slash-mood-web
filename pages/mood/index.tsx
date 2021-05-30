import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { MoodRecordsResponse } from 'types/record';
import fetch from 'libs/fetch';
import Head from 'heads/Head';
import GreetingHeader from 'modules/mood/GreetingHeader';
import styles from './style.module.scss';

type Props = { initialData?: MoodRecordsResponse };
const RecordList = dynamic(() => import('modules/mood/RecordList'), {
  ssr: false
});

const Mood: NextPage<Props> = ({ initialData }) => (
  <div className={styles.container}>
    <Head title="日日安" />
    <GreetingHeader />
    <RecordList initialData={initialData} />
  </div>
);

Mood.getInitialProps = async () => {
  try {
    const result = await fetch('records?page=1');
    if (result instanceof Error) throw result;
    return { initialData: result as MoodRecordsResponse };
  } catch (e) {
    return { initialData: undefined };
  }
};

export default Mood;
