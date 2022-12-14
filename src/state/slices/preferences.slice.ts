import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Preference } from '../types';

type InitialStateType = {
  copyNoteAsTextOnly: boolean;
};

const initialState: InitialStateType = {
  copyNoteAsTextOnly: false,
};

const prefSlice = createSlice({
  name: 'preferences',
  initialState: initialState,
  reducers: {
    setCopyNoteAsTextOnly(state, action: PayloadAction<boolean>) {
      state.copyNoteAsTextOnly = action.payload;
    },
  },
});

export const { setCopyNoteAsTextOnly } = prefSlice.actions;

export default prefSlice.reducer;
