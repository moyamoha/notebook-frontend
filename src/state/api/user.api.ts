import axios from 'axios';
import { AppDispatch, IStore, IUser, NewUser } from '../types';
import jwtDecode from 'jwt-decode';
import { setUser } from '../slices/user.slice';
import {
  setError,
  setLoginButtonLoading,
  setSignupBtnLoading,
} from '../slices/ui.slice';
import { NavigateFunction } from 'react-router';

export function login(
  credintials: { password: string; email: string },
  navigateFunc: NavigateFunction,
) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      dispatch(setLoginButtonLoading(true));
      const res = await axios.post('/auth/login', credintials);
      dispatch(setLoginButtonLoading(true));
      const token = res.data.access_token;
      const decodedToken = jwtDecode(token);
      localStorage.setItem('accessToken', token);
      dispatch(setUser(decodedToken as IUser));
      navigateFunc('/');
    } catch (error) {}
  };
}

export function signup(user: NewUser, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      dispatch(setSignupBtnLoading(true));
      const res = await axios.post('/auth/signup', user);
      dispatch(setSignupBtnLoading(false));
      navigate('/login');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function deleteUser() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const user = getState().user.current;
      if (!user) {
        // SHOW PROPER ERROR MESSAGE
        return;
      }
      await axios.delete('/users');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}
