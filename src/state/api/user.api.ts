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
import { resetData, setNotebooks } from '../slices/data.slice';
import { setCurrentNote } from '../slices/note.slice';

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

export function deleteUserAccount() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      console.log('Why?');
      const user = getState().user.current;
      if (!user) {
        // SHOW PROPER ERROR MESSAGE
        return;
      }
      await axios.delete('/users/delete-account');
      console.log('Why2?');
      window.localStorage.clear();
      dispatch(resetStore());
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function logout() {
  console.log('logout function');
  return (dispatch: AppDispatch, getState: () => IStore) => {
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
