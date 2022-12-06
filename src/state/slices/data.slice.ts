import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteNote, Note, Notebook } from '../types';

export type InitialStateT = {
  notebooks: Notebook[];
  favorites: FavoriteNote[];
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
    setFavorites: (state, action: PayloadAction<FavoriteNote[]>) => {
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
} = dataSlice.actions;
export default dataSlice.reducer;
