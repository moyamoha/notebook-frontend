import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types';

export type InitialStateT = {
  currentNote: Note | null;
  changed: boolean;
};

const initialState: InitialStateT = {
  currentNote: null,
  changed: false,
};
const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.changed = action.payload;
    },
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { setCurrentNote, setChanged } = noteSlice.actions;
export default noteSlice.reducer;
