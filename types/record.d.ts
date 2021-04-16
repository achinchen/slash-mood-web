export type Record = {
  id: number;
  categories: string[];
  mood: number;
  description: string;
  createdTime: string;
};

export type PaginationResult = {
  page: number;
  nextPage: null | number;
  prevPage: null | number;
};

