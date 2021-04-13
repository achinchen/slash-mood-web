export type Record = {
  id: number;
  categories: number[];
  mood: number;
  description: string;
};

export type PaginationResult = {
  page: number;
  nextPage: null | number;
  prevPage: null | number;
};
