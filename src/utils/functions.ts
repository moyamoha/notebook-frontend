import { htmlToText } from 'html-to-text';
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
  const result = splited.slice(0, words).join(' ').toLocaleLowerCase();
  return result.length <= 24 ? result : result.substring(0, 24);
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

export const getNoteIndex = (notebook: Notebook, noteId: string): number => {
  return notebook.notes.findIndex((n) => n._id === noteId);
};

export const getUsrFullName = (user: IUser): string => {
  return `${user.firstname} ${user.lastname}`;
};

export const generateHtmlContentFromNote = (note: Note): string => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${getNFirstWords(htmlToText(note.content), 1)}</title>
  </head>
  <body>
      ${note.content}
  </body>
  </html>`;
  return html;
};

export const noteIsInNotebook = (notebook: Notebook, noteId: string) => {
  return notebook.notes.map((n) => n._id).includes(noteId);
};
