import { Notebook } from '../state/types';

export const slugify = (text: string): string => {
  return text
    .split(' ')
    .map((w) => w.toLowerCase())
    .join('-');
};

export const getTwoFirstWords = (text: string): string => {
  return text.split(' ').slice(0, 2).join(' ');
};

export const getNotesNotebookName = (
  notebooks: Notebook[],
  noteId: string,
): string => {
  let res = '';
  console.log(notebooks);
  console.log(noteId);
  for (let i = 0; i < notebooks.length; i++) {
    const nb = notebooks[i];
    for (let j = 0; j < nb.notes.length; j++) {
      if (nb.notes[j]._id === noteId) {
        res = nb.name;
        break;
      }
    }
  }
  return res;
};
