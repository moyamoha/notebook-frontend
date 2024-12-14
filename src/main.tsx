import React from 'react';
import axios, { AxiosError } from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import store, { persistor } from './state/store';
import App from './App';

import './index.css';
import { DndProvider } from 'react-dnd/dist/core';
import { AUTH_URL, SITE_URL } from './utils/constants';

axios.defaults.baseURL = 'https://yahya-8csr.onrender.com';
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

axios.interceptors.response.use(
  function (resp) {
    return resp;
  },
  function (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      window.location.href = `${AUTH_URL}/login?redirect=${SITE_URL}`;
    }
  },
);

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
