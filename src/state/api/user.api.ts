import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavigateFunction } from 'react-router';

import {
  AppDispatch,
  IStore,
  IUser,
  NewUser,
  PreferencesObject,
} from '../types';
import { getUsrFullName } from '../../utils/functions';
import {
  ProfileKeyType,
  resetUserSlice,
  setProfile,
  setUser,
} from '../slices/user.slice';
import { resetData } from '../slices/data.slice';
import { setCurrentNote } from '../slices/note.slice';
import {
  resetUi,
  setError,
  setLoginButtonLoading,
  setSignupBtnLoading,
} from '../slices/ui.slice';

export function loginWithDemoUser() {
  return async (dispatch: AppDispatch) => {
    try {
      await axios.post('/auth(');
    } catch (e) {}
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
    dispatch(resetUserSlice());
    dispatch(resetUi());
    dispatch(setCurrentNote(null));
    dispatch(resetData());
  };
}

export function getPreferences() {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const prefString = localStorage.getItem('preferences');
    if (!prefString) {
      localStorage.setItem(
        'preferences',
        JSON.stringify({ copyNoteAsTextOnly: false }),
      );
    } else {
      const prefs: PreferencesObject = JSON.parse(prefString);
      dispatch(setProfile(prefs));
    }
  };
}

export function editProfile(profileKey: ProfileKeyType, value: any) {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const profile = { ...getState().user.profile, [profileKey]: value };
    localStorage.setItem('preferences', JSON.stringify(profile));
    dispatch(setProfile(profile));
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
