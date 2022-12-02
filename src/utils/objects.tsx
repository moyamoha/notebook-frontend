import { Note } from '../state/types';

type K = 'writer' | '_id';
export const draftNote: Omit<Note, K> = {
  content: '<h1>New note</h1>',
  updatedAt: new Date().toLocaleDateString(),
};
