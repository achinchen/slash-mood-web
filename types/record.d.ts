import type { Category, Mood } from './mood';

export type MoodRecord = {
  id: number;
  categories: Category[];
  mood: Mood;
  description: string;
  createdTime: string;
  updatedTime: string;
};

export type MoodRecordsResponse = {
  records: MoodRecord[];
  hasNext: boolean;
};
