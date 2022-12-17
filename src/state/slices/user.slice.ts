import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, PreferencesObject } from '../types';

type InitialStateT = {
  current: IUser | null;
  profile: PreferencesObject;
};

export type ProfileKeyType = 'copyNoteAsTextOnly' | 'downloadNoteAsHtml';

const initialState: InitialStateT = {
  current: null,
  profile: {
    copyNoteAsTextOnly: false,
    downloadNoteAsHtml: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.current = action.payload;
    },
    setProfile(state, action: PayloadAction<PreferencesObject>) {
      state.profile = { ...action.payload };
    },
    resetUserSlice: () => initialState,
  },
});

export const { setUser, setProfile, resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
