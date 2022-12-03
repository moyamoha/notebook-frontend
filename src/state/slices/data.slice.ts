import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Notebook } from '../types';

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
  },
});

export const {
  setNotebooks,
  addNotebook,
  removeNotebook,
  setCurrentNotebook,
  renameNotebook,
  setFavorites,
} = dataSlice.actions;
export default dataSlice.reducer;
