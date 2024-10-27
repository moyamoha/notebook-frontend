import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateT = {
  error: string;
  activeNav: string;
  isCreatingNew: boolean;
  expandNotebooks: boolean;
  isEditingExistingNotebook: boolean;
  isEditingNote: boolean;
};

const initialState: InitialStateT = {
  error: '',
  activeNav: '',
  isCreatingNew: false, // refers to if it is creating new notebook
  isEditingExistingNotebook: false,
  expandNotebooks: true,
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
  setIsEditingExistingNotebook,
  resetUi,
} = uiSlice.actions;
export default uiSlice.reducer;
