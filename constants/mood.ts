import type { Mood } from 'types/mood';
export const CATEGORIES = {
  work: '工作',
  home: '家庭',
  social: '人際',
  ability: '能力',
  mentality: '心理',
  body: '生理',
  financial: '財務',
  achievement: '成就'
} as const;

export const MOOD = [
  'claim',
  'happy',
  'smile',
  'notTrouble',
  'tried',
  'speechless',
  'sad',
  'angry'
] as const;

export const MOODS: { [key in Mood]: string } = {
  claim: '平靜',
  happy: '開心',
  smile: '微笑',
  notTrouble: '沒問題',
  tried: '疲憊',
  speechless: '無言',
  sad: '難過',
  angry: '生氣'
};
