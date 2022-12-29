import axios from 'axios';
import { NavigateFunction } from 'react-router';

import { AppDispatch, IStore, Notebook } from '../types';
import { slugify } from '../../utils/functions';
import { setActiveNav, setError } from '../slices/ui.slice';
import { setCurrentNote } from '../slices/note.slice';
import {
  addNotebook,
  removeNotebook,
  renameNotebook,
  setCurrentNotebook,
  setFavorites,
  setNotebooks,
} from '../slices/data.slice';
import { updateFavorites } from './notes.api';

export function getNotebooks(navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const response = await axios.get('/notebooks/');
      const notebooks = response.data as Notebook[];
      if (notebooks.length > 0) {
        dispatch(setCurrentNotebook(notebooks[0]));
        if (notebooks[0].notes.length > 0) {
          dispatch(setCurrentNote(notebooks[0].notes[0]));
        }
        navigate(`/${slugify(notebooks[0].name)}`);
        dispatch(setActiveNav(`${slugify(notebooks[0].name)}`));
      }
      dispatch(setNotebooks(notebooks));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function deleteNotebook(notebookId: string, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      await axios.delete(`/notebooks/${notebookId}`);
      dispatch(removeNotebook(notebookId));
      const notebooks = getState().data.notebooks;
      if (notebooks.length > 0) {
        dispatch(setCurrentNotebook(notebooks[0]));
        if (notebooks[0].notes.length) {
          dispatch(setCurrentNote(notebooks[0].notes[0]));
        }
        navigate(`/${slugify(notebooks[0].name)}`);
        dispatch(setActiveNav(`${slugify(notebooks[0].name)}`));
      } else {
        dispatch(setCurrentNote(null));
        dispatch(setCurrentNotebook(null));
        navigate('/');
      }
      dispatch(updateFavorites());
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function editNotebookName(name: string, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const notebook = getState().data.currentNotebook;
      if (!notebook) {
        // SHOW A PROPER MESSAGE
        return;
      }
      const notebookId = notebook._id;
      await axios.patch(`/notebooks/rename/${notebookId}`, { name });
      dispatch(renameNotebook({ id: notebookId, name: name }));
      navigate(`/${slugify(name)}`);
      dispatch(setActiveNav(slugify(name)));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function createNotebook(name: string) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const res = await axios.post('/notebooks/', { name: name });
      dispatch(addNotebook(res.data));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}
