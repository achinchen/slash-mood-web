import Head from 'next/head';
import styled from '@emotion/styled';
import MoodCards from 'components/mood/MoodCards';
import { Category } from 'types/mood';
import { MOOD } from 'constants/mood';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #333333;
`;

const AddButtonImage = styled.img`
  width: 28px;
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

const ArrowButtonImage = styled.img`
  width: 28px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.8;
`;

const Footer = styled.footer`
  margin: auto auto 20px;
`;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const generateMockMood = (length: number) => {
  return Array.from({ length }, (_, index) => ({
    time: `${String(index + 1).padStart(2, '0')} 星期三 ${String(
      index * 3 + Math.floor(Math.random() * 10)
    ).padStart(2, '0')}:00`,
    categories: ['work', 'home'] as Category[],
    mood: MOOD[(index + Math.floor(Math.random() * 10)) % MOOD.length]
  }));
};

const moock = generateMockMood(4);
function Mood(): JSX.Element {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <ArrowButton>
          <ArrowButtonImage
            src="/images/icon/arrow-left.svg"
            alt="選擇前一個月"
          />
        </ArrowButton>
        <H1>
          {MONTHS[month]}, {year}
        </H1>
        <ArrowButton>
          <ArrowButtonImage
            src="/images/icon/arrow-right.svg"
            alt="選擇前一個月"
          />
        </ArrowButton>
      </Header>
      <MoodCards moodList={moock} />
      <AddButton>
        <AddButtonImage src="/images/icon/plus.svg" alt="增加心情紀錄" />
      </AddButton>
      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @achin
        </a>
      </Footer>
    </Container>
  );
}

export default Mood;
