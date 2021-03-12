import { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
// import { Category } from 'types/mood';
import { MOODS } from 'constants/mood';

const Header = styled.header`
  position: relative;
  margin: 24px 0;
`;

const H1 = styled.h1`
  margin: 24px 0 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.8;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -12px;
  left: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
`;

const CloseIcon = styled.img`
  width: 20px;
`;

const Main = styled.main`
  position: relative;
`;

const MoodButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 84px;
  // data-mood
`;

const MoodIcon = styled.img`
  width: 76px;
`;

function Mood(): JSX.Element {
  const [currentMood, setCurrentMood] = useState();
  const [step, setCurrentStep] = useState(0);

  return (
    <Container>
      <Head>
        <title>Add Mood Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <CloseButton>
          <CloseIcon src="/images/icon/close.svg" alt="關閉" />
        </CloseButton>
        <H1>你的心情是 {currentMood || '______'}</H1>
      </Header>
      <Main>
        {Object.entries(MOODS).map(([mood, text]) => (
          <MoodButton key={mood} data-mood={mood}>
            <MoodIcon src={`/images/mood/${mood}.svg`} alt={`${text}的心情`} />
          </MoodButton>
        ))}
      </Main>
    </Container>
  );
}

export default Mood;
