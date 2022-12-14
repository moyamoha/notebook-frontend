import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '../types';

export type InitialStateT = {
  currentNote: Note | null;
};

const initialState: InitialStateT = {
  currentNote: null,
};
const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { setCurrentNote } = noteSlice.actions;
export default noteSlice.reducer;
