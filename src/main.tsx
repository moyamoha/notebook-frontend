import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import store, { persistor } from './state/store';
import App from './App';

import './index.css';
import { DndProvider } from 'react-dnd/dist/core';

axios.defaults.baseURL = 'https://yahya-8csr.onrender.com';

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </PersistGate>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);
