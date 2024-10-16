import store from './store';

export type Note = {
  content: string;
  _id: string;
  writer: string;
  updatedAt: string | Date;
  isFavorite: boolean;
};

export type CreateNewNotePayload = Pick<Note, 'content'>;

export type Notebook = {
  name: string;
  _id: string;
  owner: string;
  notes: Note[];
};

export interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  id: string;
  iat?: number;
}

export type PreferencesObject = {
  copyNoteAsTextOnly: boolean;
  downloadNoteAsHtml: boolean;
};

export interface NewUser {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  gender: 'male' | 'female';
}

export type IStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
