import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateT = {
  error: string;
  activeNav: string;
  isCreatingNew: boolean;
  expandNotebooks: boolean;
  loginButtonLoading: boolean;
  signupBtnLoading: boolean;
  isEditingExistingNotebook: boolean;
  isEditingNote: boolean;
};

const initialState: InitialStateT = {
  error: '',
  activeNav: '',
  isCreatingNew: false, // refers to if it is creating new notebook
  isEditingExistingNotebook: false,
  expandNotebooks: true,
  loginButtonLoading: false,
  signupBtnLoading: false,
  isEditingNote: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setActiveNav: (state, action: PayloadAction<string>) => {
      state.activeNav = action.payload;
    },
    setIsCreatingNew: (state, action: PayloadAction<boolean>) => {
      state.isCreatingNew = action.payload;
    },
    setExpandNotebooks: (state, action: PayloadAction<boolean>) => {
      state.expandNotebooks = action.payload;
    },
    setLoginButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.loginButtonLoading = action.payload;
    },
    setSignupBtnLoading: (state, action: PayloadAction<boolean>) => {
      state.signupBtnLoading = action.payload;
    },
    setIsEditingExistingNotebook: (state, action: PayloadAction<boolean>) => {
      state.isEditingExistingNotebook = action.payload;
    },
    setIsEditingNote: (state, action: PayloadAction<boolean>) => {
      state.isEditingNote = action.payload;
    },
    resetUi: () => initialState,
  },
});

export const {
  setError,
  setActiveNav,
  setIsCreatingNew,
  setExpandNotebooks,
  setLoginButtonLoading,
  setSignupBtnLoading,
  setIsEditingExistingNotebook,
  resetUi,
} = uiSlice.actions;
export default uiSlice.reducer;
