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
      const favorites = [...getState().data.favorites];
      await axios.delete(`/notebooks/${notebookId}`);
      dispatch(removeNotebook(notebookId));
      const notebooks = getState().data.notebooks;
      const allNotes = notebooks
        .map((n) => {
          return [...n.notes];
        })
        .flat();
      if (notebooks.length > 0) {
        dispatch(setCurrentNotebook(notebooks[0]));
        if (notebooks[0].notes.length) {
          dispatch(setCurrentNote(notebooks[0].notes[0]));
        }
        const filteredFavorites = favorites.filter((f) => {
          return allNotes.find((n) => n._id === f._id) !== undefined;
        });
        dispatch(setFavorites(filteredFavorites));
        navigate(`/${slugify(notebooks[0].name)}`);
        dispatch(setActiveNav(`${slugify(notebooks[0].name)}`));
      } else {
        dispatch(setCurrentNote(null));
        dispatch(setCurrentNotebook(null));
        navigate('/');
      }
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
