import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IActiveNav =
  | ''
  | 'new_note'
  | 'scratch_pad'
  | 'favorites'
  | 'all_notes';

type InitialStateT = {
  error: string;
  activeNav: IActiveNav;
  isCreatingNew: boolean;
  expandNotebooks: boolean;
  loginButtonLoading: boolean;
  signupBtnLoading: boolean;
  isEditingExistingNotebook: boolean;
  isEditingNote: boolean;
  showSettingsModal: boolean;
};

const initialState: InitialStateT = {
  error: '',
  activeNav: 'scratch_pad',
  isCreatingNew: false, // refers to if it is creating new notebook
  isEditingExistingNotebook: false,
  expandNotebooks: true,
  loginButtonLoading: false,
  signupBtnLoading: false,
  isEditingNote: false,
  showSettingsModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setActiveNav: (state, action: PayloadAction<IActiveNav>) => {
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
    setShowSettingsModal: (state, action: PayloadAction<boolean>) => {
      state.showSettingsModal = action.payload;
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
  setShowSettingsModal,
  resetUi,
} = uiSlice.actions;
export default uiSlice.reducer;
