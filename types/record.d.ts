import { Category, Mood } from './mood';

export type Record = {
  id: number;
  categories: Category[];
  mood: Mood;
  description: string;
  createdTime: string;
};

export type PaginationResult = {
  page: number;
  nextPage: null | number;
  prevPage: null | number;
};

