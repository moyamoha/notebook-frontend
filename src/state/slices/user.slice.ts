import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../types';

type InitialStateT = {
  current: IUser | null;
};

const initialState: InitialStateT = {
  current: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.current = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
