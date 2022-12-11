import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavigateFunction } from 'react-router';

import { AppDispatch, IStore, IUser, NewUser } from '../types';
import { setUser } from '../slices/user.slice';
import {
  resetUi,
  setError,
  setLoginButtonLoading,
  setSignupBtnLoading,
} from '../slices/ui.slice';
import { resetData } from '../slices/data.slice';
import { setCurrentNote } from '../slices/note.slice';
import { getUsrFullName } from '../../utils/functions';

export function login(
  credintials: { password: string; email: string },
  navigateFunc: NavigateFunction,
) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      dispatch(setLoginButtonLoading(true));
      const res = await axios.post('/auth/login', credintials);
      dispatch(setLoginButtonLoading(false));
      const token = res.data.access_token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem('accessToken', token);
      dispatch(setUser(decodedToken as IUser));
      dispatch(setError(''));
      navigateFunc('/');
    } catch (error: any) {
      dispatch(setLoginButtonLoading(false));
      dispatch(setError(error.response.data.message));
    }
  };
}

export function signup(user: NewUser, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      dispatch(setSignupBtnLoading(true));
      const res = await axios.post('/auth/signup', user);
      dispatch(setSignupBtnLoading(false));
      dispatch(setError(''));
      navigate('/login');
    } catch (error: any) {
      setSignupBtnLoading(false);
      dispatch(setError(error.response.data.message));
    }
  };
}

export function removeUserAccount(navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      await axios.delete('/users/delete-account');
      dispatch(resetStore());
      localStorage.clear();
      navigate('/login');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function logout() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    window.localStorage.removeItem('accessToken');
    dispatch(resetStore());
  };
}

export function resetStore() {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    dispatch(setUser(null));
    dispatch(resetUi());
    dispatch(setCurrentNote(null));
    dispatch(resetData());
  };
}

export function downloadUserData() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const user = getState().user.current;
    if (!user) return;
    try {
      const response = await axios.get('/users/download-data', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const fileName = getUsrFullName(user) + '_data.json';
      link.href = url;
      link.setAttribute('download', fileName);
      link.textContent = fileName;
      link.target = '_blank';
      link.addEventListener('click', (e) => {
        setTimeout(() => {
          link.remove();
        }, 2000);
      });
      const placeToPutLink = document.getElementById(
        'data-management',
      ) as HTMLElement;
      placeToPutLink.appendChild(link);
    } catch (e) {}
  };
}
