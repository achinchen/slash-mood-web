import { FC } from 'react';
import styled from '@emotion/styled';
import media from 'styles/media';
import { CATEGORIES } from 'constants/mood';
import { Mood, Category } from 'types/mood';

const Main = styled.main`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${media(
    'tablet',
    `
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    `
  )}

  ${media(
    'landscape',
    `
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    `
  )}
`;

const Section = styled.section`
  display: inline-flex;
  align-content: center;
  border: 1.6px solid #3a3a3a;
  border-radius: 20px;
  padding: 12px;
  height: 92px;
`;

const Moodle = styled.img`
  width: 64px;
  margin-right: 12px;
`;

const Time = styled.time`
  display: block;
  font-size: 1.6rem;
  margin-bottom: 4px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 4px;
  font-size: 1.2rem;
  letter-space: 0.4rem;
  background-color: ${(props) => props.color};

  &:not(:last-child) {
    margin-right: 4px;
  }
`;

const CATEGORIES_COLOR = {
  work: '#9BDBF7',
  home: '#FEDEA3',
  social: '#FAB9D0',
  ability: '#FAC696',
  mentality: '#74E8E8',
  body: '#9BF7D6',
  financial: '#BAB9FB',
  achievement: '#FF9999'
};

type Props = {
  moodList: { time: string; categories: Category[]; mood: Mood }[];
};

const MoodCards: FC<Props> = ({ moodList }) => (
  <Main>
    {moodList.map(({ time, mood, categories }) => (
      <Section key={`${time}-${mood}`}>
        <Moodle src={`/images/mood/${mood}.svg`} alt={`${mood}`} />
        <p>
          <Time>{time}</Time>
          {categories.map((category) => (
            <Tag key={`${time}-${category}`} color={CATEGORIES_COLOR[category]}>
              {CATEGORIES[category]}
            </Tag>
          ))}
        </p>
      </Section>
    ))}
  </Main>
);

export default MoodCards;
