import axios from 'axios';
import { NavigateFunction } from 'react-router';

import {
  AppDispatch,
  CreateNewNotePayload,
  IStore,
  Note,
  Notebook,
} from '../types';
import { noteIsFavorite, slugify } from '../../utils/functions';
import { setCurrentNote } from '../slices/note.slice';
import {
  addNoteToNotebook,
  removeNoteFromNotebook,
  replaceNote,
  setFavorites,
} from '../slices/data.slice';
import { getNotebooks } from './notebooks.api';

export function deleteNote() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote;
    try {
      if (!notebook || !note) return;
      await axios.delete(`/notes/${notebook._id}/${note._id}`);
      if (noteIsFavorite(getState().data.favorites, note._id)) {
        dispatch(removeFromFavorites(note._id));
      }
      dispatch(removeNoteFromNotebook(note._id));
      if (getState().data.currentNotebook?.notes.length === 0) {
        dispatch(setCurrentNote(null));
      } else {
        dispatch(
          setCurrentNote(getState().data.currentNotebook?.notes[0] as Note),
        );
      }
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

export function createNewNote(
  note: CreateNewNotePayload,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    try {
      if (!notebook) return;
      const response = await axios.post(`/notes/${notebook._id}`, note);
      dispatch(
        addNoteToNotebook({ notebookId: notebook._id, note: response.data }),
      );
      dispatch(setCurrentNote(response.data));
      navigate(`/${slugify(notebook.name)}`);
    } catch (error) {}
  };
}

export function editExistingNote(newContent: string) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote;
    const favorites = [...getState().data.favorites];
    try {
      if (!notebook || !note) {
        return;
      }
      const response = await axios.put(`/notes/${note._id}`, {
        content: newContent,
        updatedAt: new Date(),
      });
      const editedNote = response.data;
      dispatch(replaceNote(editedNote));
      if (noteIsFavorite(favorites, editedNote._id)) {
        const fIndex = favorites.findIndex((f) => f._id === editedNote._id);
        favorites[fIndex] = editedNote;
        dispatch(setFavorites(favorites));
      }
      dispatch(setCurrentNote(editedNote));
    } catch (error) {}
  };
}

export function moveNoteToNotebook(
  target: Notebook,
  note: Note,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    try {
      const currentNotebook = getState().data.currentNotebook;
      if (!target || !currentNotebook || !note) return;
      await axios.patch(`/notes/move-note/${note._id}`, {
        from: currentNotebook._id,
        to: target._id,
      });
      dispatch(getNotebooks(navigate));
      dispatch(getFavorites());
    } catch (error) {}
  };
}
