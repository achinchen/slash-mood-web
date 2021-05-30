import type { Mood, Category } from 'types/mood';

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

export const CATEGORIES_MAP: {
  [key in Category]: {
    emoji: string;
    label: string;
  };
} = {
  work: {
    emoji: '💻',
    label: '工作'
  },
  home: {
    emoji: '🏠',
    label: '家庭'
  },
  social: {
    emoji: '💁',
    label: '人際'
  },
  ability: { emoji: '💡', label: '能力' },
  mentality: { emoji: '❤️', label: '心理' },
  body: { emoji: '💪', label: '生理' },
  financial: { emoji: '💰', label: '財務' },
  achievement: { emoji: '⛳️', label: '成就' }
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

export const MOODS_MAP: { [key in Mood]: string } = {
  claim: '平靜',
  happy: '開心',
  smile: '微笑',
  notTrouble: '沒問題',
  tried: '疲憊',
  speechless: '無言',
  sad: '難過',
  angry: '生氣'
};
