import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavigateFunction } from 'react-router';

import { AppDispatch, IStore, IUser, NewUser } from '../types';
import { setUser } from '../slices/user.slice';
import {
  setError,
  setLoginButtonLoading,
  setSignupBtnLoading,
} from '../slices/ui.slice';

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
      const user = getState().user.current;
      if (!user) {
        // SHOW PROPER ERROR MESSAGE
        return;
      }
      await axios.delete('/users/delete-account');
      localStorage.clear();
      dispatch(setUser(null));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function logout() {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    localStorage.clear();
    dispatch(setUser(null));
  };
}
