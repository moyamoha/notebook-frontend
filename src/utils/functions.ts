import { Note, Notebook } from '../state/types';

export const slugify = (text: string): string => {
  return text
    .split(' ')
    .map((w) => w.toLowerCase())
    .join('-');
};

export const getTwoFirstWords = (text: string): string => {
  return text.split(' ').slice(0, 2).join(' ').toLocaleLowerCase();
};

export const getNotesNotebookName = (
  notebooks: Notebook[],
  noteId: string,
): string => {
  let res = '';
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

export const dateToPrettyString = (datetime: Date | string) => {
  const date = new Date(datetime);
  const time = date.toLocaleTimeString().replaceAll('\\.', '/').substring(0, 5);
  const datePart = date.toLocaleDateString();
  return `${time} on ${datePart}`;
};

export const noteIsFavorite = (favorites: Note[], note: Note) => {
  return favorites.findIndex((f) => f._id === note._id) !== -1;
};

export const getNoteIndex = (notebook: Notebook, noteId: string): number => {
  return notebook.notes.findIndex((n) => n._id === noteId);
};
