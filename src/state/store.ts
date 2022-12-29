import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import dataReducer from './slices/data.slice';
import noteReducer from './slices/note.slice';
import uiReducer from './slices/ui.slice';
import userReducer from './slices/user.slice';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const reducer = combineReducers({
  data: dataReducer,
  note: noteReducer,
  ui: uiReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
