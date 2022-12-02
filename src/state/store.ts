import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/data.slice';
import noteReducer from './slices/note.slice';
import uiReducer from './slices/ui.slice';
import userReducer from './slices/user.slice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    note: noteReducer,
    ui: uiReducer,
    user: userReducer,
  },
});

export default store;
