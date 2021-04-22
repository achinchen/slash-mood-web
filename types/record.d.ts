import { Categories, Moods } from './mood';

export type Record = {
  id: number;
  categories: Categories[number][];
  mood: Moods[number];
  description: string;
  createdTime: string;
};

export type PaginationResult = {
  page: number;
  nextPage: null | number;
  prevPage: null | number;
};

