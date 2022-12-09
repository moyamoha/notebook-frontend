import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNoteIndex } from '../../utils/functions';
import { FavoriteNote, Note, Notebook } from '../types';

export type InitialStateT = {
  notebooks: Notebook[];
  favorites: Note[];
  currentNotebook: Notebook | null;
};

const initialState: InitialStateT = {
  notebooks: [],
  favorites: [],
  currentNotebook: null,
};
const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setNotebooks: (state, action: PayloadAction<Notebook[]>) => {
      state.notebooks = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Note[]>) => {
      state.favorites = action.payload;
    },
    removeNotebook: (state, action: PayloadAction<string>) => {
      const index = state.notebooks.findIndex(
        (nb) => nb._id === action.payload,
      );
      state.notebooks.splice(index, 1);
    },
    renameNotebook: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const index = state.notebooks.findIndex(
        (nb) => nb._id === action.payload.id,
      );
      state.notebooks[index].name = action.payload.name;
    },
    addNotebook: (state, action: PayloadAction<Notebook>) => {
      state.notebooks.push(action.payload);
    },
    setCurrentNotebook: (state, action: PayloadAction<Notebook | null>) => {
      state.currentNotebook = action.payload;
    },
    addNoteToNotebook: (
      state,
      action: PayloadAction<{ notebookId: String; note: Note }>,
    ) => {
      const index = state.notebooks.findIndex(
        (nb) => nb._id === action.payload.notebookId,
      );
      state.notebooks[index].notes.unshift(action.payload.note);
      state.currentNotebook = state.notebooks[index];
    },
    removeNoteFromNotebook: (state, action: PayloadAction<string>) => {
      const currNb = state.currentNotebook;
      if (!currNb) return;
      const nbIndex = state.notebooks.findIndex((nb) => nb._id === currNb._id);
      const noteIndex = state.notebooks[nbIndex].notes.findIndex(
        (n) => n._id === action.payload,
      );
      state.notebooks[nbIndex].notes.splice(noteIndex, 1);
      state.currentNotebook = state.notebooks[nbIndex];
    },
    replaceNote: (state, action: PayloadAction<Note>) => {
      const currNb = state.currentNotebook;
      if (!currNb) return;
      const nbIndex = state.notebooks.findIndex((nb) => nb._id === currNb._id);
      const noteIndex = getNoteIndex(currNb, action.payload._id);
      state.notebooks[nbIndex].notes[noteIndex] = action.payload;
      state.currentNotebook = state.notebooks[nbIndex];
    },
  },
});

export const {
  setNotebooks,
  addNotebook,
  removeNotebook,
  setCurrentNotebook,
  renameNotebook,
  setFavorites,
  addNoteToNotebook,
  removeNoteFromNotebook,
  replaceNote,
} = dataSlice.actions;
export default dataSlice.reducer;
