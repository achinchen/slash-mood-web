import { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
};

const BasicHead: FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title} - Pangomoo</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default BasicHead;
