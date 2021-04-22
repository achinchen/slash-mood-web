import type { Moods, Categories } from 'types/mood';

export const CATEGORIES = [
  'work',
  'home',
  'social',
  'ability',
  'mentality',
  'body',
  'financial',
  'achievement'
] as const;

export const CATEGORIES_MAP: { [key in Categories]: string } = {
  work: '工作',
  home: '家庭',
  social: '人際',
  ability: '能力',
  mentality: '心理',
  body: '生理',
  financial: '財務',
  achievement: '成就'
};

export const MOODS = [
  'claim',
  'happy',
  'smile',
  'notTrouble',
  'tried',
  'speechless',
  'sad',
  'angry'
] as const;

export const MOODS_MAP: { [key in Moods]: string } = {
  claim: '平靜',
  happy: '開心',
  smile: '微笑',
  notTrouble: '沒問題',
  tried: '疲憊',
  speechless: '無言',
  sad: '難過',
  angry: '生氣'
};
