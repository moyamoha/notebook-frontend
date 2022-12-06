import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { NavigateFunction } from 'react-router';
import {
  getNotesNotebookName,
  getTwoFirstWords,
  slugify,
} from '../../utils/functions';
import { addNoteToNotebook, setFavorites } from '../slices/data.slice';
import { setCurrentNote } from '../slices/note.slice';
import {
  AppDispatch,
  CreateNewNotePayload,
  FavoriteNote,
  IStore,
  Note,
} from '../types';

export function deleteNote() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote as Note;
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
      const favorites: FavoriteNote[] = JSON.parse(favsString);
      dispatch(setFavorites(favorites));
    }
  };
}

export function addToFavorites(note: Note) {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const favsString = localStorage.getItem('favorites');
    const notesNotebookName = getNotesNotebookName(
      getState().data.notebooks,
      note._id,
    );
    if (!favsString) {
      localStorage.setItem('favorites', JSON.stringify([note]));
    } else {
      const favorites: FavoriteNote[] = JSON.parse(favsString);
      favorites.push({ ...note, notebookName: notesNotebookName });
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
      const favorites: FavoriteNote[] = JSON.parse(favsString);
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
      if (!notebook) {
        return;
      }
      const response = await axios.post(`/notes/${notebook._id}`, note);
      dispatch(
        addNoteToNotebook({ notebookId: notebook._id, note: response.data }),
      );
      dispatch(setCurrentNote(response.data));
      const noteNameSlugified = `${slugify(
        getTwoFirstWords(htmlToText(response.data.content)),
      )}`;
      navigate(`/${slugify(notebook.name)}`);
    } catch (error) {}
  };
}
