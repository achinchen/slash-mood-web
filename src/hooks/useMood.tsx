import { useState } from 'react';
import type { Category, Mood } from 'types/mood';

const MAXIMUM_CATEGORIES = 3;

export type Parameters = {
  mood: Mood;
  categories: Category[];
  description: string;
};

type Return = {
  onMood: (mood: Mood) => void;
  onCategories: (category: Category) => void;
  onDescription: (description: string) => void;
} & Parameters;

const useMood = (props?: Parameters): Return => {
  const [mood, onMood] = useState<Mood | undefined>(props?.mood || undefined);
  const [categories, setCategories] = useState<Category[]>(
    props?.categories || []
  );
  const [description, onDescription] = useState(props?.description || '');

  const onCategories = (category: Category) => {
    setCategories((categories) => {
      if (categories.includes(category))
        return categories.filter(
          (currentCategory) => currentCategory !== category
        );
      if (categories.length >= MAXIMUM_CATEGORIES) return categories;
      return [...categories, category];
    });
  };

  return {
    mood,
    categories,
    description,
    onMood,
    onCategories,
    onDescription
  };
};

export default useMood;
