import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types';

export type InitialStateT = {
  currentNote: Note | null;
  edited: boolean;
};

const initialState: InitialStateT = {
  currentNote: null,
  edited: false,
};
const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setEdited: (state, action: PayloadAction<boolean>) => {
      state.edited = action.payload;
    },
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { setCurrentNote, setEdited } = noteSlice.actions;
export default noteSlice.reducer;
