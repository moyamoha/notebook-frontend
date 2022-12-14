import { IUser, Note, Notebook } from '../state/types';

export const slugify = (text: string): string => {
  return text
    .split(' ')
    .map((w) => w.toLowerCase())
    .join('-');
};

export const getNFirstWords = (text: string, n: number): string => {
  let words = n;
  const firstRow = text.split('\n')[0];
  const splited = firstRow.split(' ').map((w) => w.replaceAll('\n', ''));
  if (n > splited.length) words = splited.length;
  return splited.slice(0, words).join(' ').toLocaleLowerCase();
};

export const getNotesNotebook = (
  notebooks: Notebook[],
  noteId: string,
): Notebook | null => {
  let res = null;
  for (let i = 0; i < notebooks.length; i++) {
    const nb = notebooks[i];
    for (let j = 0; j < nb.notes.length; j++) {
      if (nb.notes[j]._id === noteId) {
        res = nb;
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

export const noteIsFavorite = (favorites: Note[], noteId: string) => {
  return favorites.findIndex((f) => f._id === noteId) !== -1;
};

export const getNoteIndex = (notebook: Notebook, noteId: string): number => {
  return notebook.notes.findIndex((n) => n._id === noteId);
};

export const getUsrFullName = (user: IUser): string => {
  return `${user.firstname} ${user.lastname}`;
};
