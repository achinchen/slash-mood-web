import {CATEGORIES, MOOD} from 'constants/mood';

export type Category = keyof typeof CATEGORIES;

export type Mood = typeof MOOD[number];