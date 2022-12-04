import axios from 'axios';
import { setFavorites } from '../slices/data.slice';
import { AppDispatch, IStore, Note } from '../types';
import { getNotebooks } from './notebooks.api';

export function deleteNote() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote;
    try {
      if (!notebook || !note) {
        // SHOW PROPER ERROR MESSAGE
        return;
      }
      await axios.delete(`/notes/${notebook._id}${note._id}`);
    } catch (error) {}
  };
}

export function getFavorites() {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const favsString = localStorage.getItem('favorites');
    if (!favsString) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } else {
      const favorites: Note[] = JSON.parse(favsString);
      dispatch(setFavorites(favorites));
    }
  };
}

export function addToFavorites(note: Note) {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const favsString = localStorage.getItem('favorites');
    console.log('tuli tänne');
    if (!favsString) {
      localStorage.setItem('favorites', JSON.stringify([note]));
    } else {
      const favorites: Note[] = JSON.parse(favsString);
      favorites.push(note);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      dispatch(setFavorites(favorites));
    }
  };
}

export function removeFromFavorites(noteId: string) {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const favsString = localStorage.getItem('favorites');
    if (!favsString) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } else {
      const favorites: Note[] = JSON.parse(favsString);
      const index = favorites.findIndex((f) => f._id === noteId);
      if (index === -1) return;
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      dispatch(setFavorites(favorites));
    }
  };
}
