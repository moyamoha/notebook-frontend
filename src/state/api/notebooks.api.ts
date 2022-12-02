import axios from 'axios';
import { NavigateFunction } from 'react-router';
import { slugify } from '../../utils/functions';
import {
  addNotebook,
  removeNotebook,
  renameNotebook,
  setCurrentNotebook,
  setFavorites,
  setNotebooks,
} from '../slices/data.slice';
import { setError, setIsEditingExistingNotebook } from '../slices/ui.slice';
import { AppDispatch, IStore, Note, Notebook } from '../types';

export function getNotebooks(navigate: NavigateFunction) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const response = await axios.get('/notebooks/');
      const notebooks = response.data as Notebook[];
      if (notebooks.length > 0) {
        dispatch(setCurrentNotebook(notebooks[0]));
        navigate(`/${slugify(notebooks[0].name)}`);
      }
      dispatch(setNotebooks(notebooks));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function deleteNotebook(notebookId: string) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      await axios.delete(`/notebooks/${notebookId}`);
      dispatch(removeNotebook(notebookId));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
}

export function editNotebookName(name: string) {
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
