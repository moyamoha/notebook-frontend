import axios from 'axios';
import { NavigateFunction } from 'react-router';
import { htmlToText } from 'html-to-text';

import {
  AppDispatch,
  CreateNewNotePayload,
  IStore,
  Note,
  Notebook,
} from '../types';
import { slugify } from '../../utils/functions';
import { setCurrentNote } from '../slices/note.slice';
import {
  addNoteToNotebook,
  removeNoteFromNotebook,
  replaceNote,
  setCurrentNotebook,
  setFavorites,
  setNotebooks,
} from '../slices/data.slice';
import { setActiveNav } from '../slices/ui.slice';

export function deleteNote() {
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote;
    try {
      if (!notebook || !note) return;
      await axios.delete(`/notes/${note._id}/?notebookId=${notebook._id}`);
      dispatch(removeNoteFromNotebook(note._id));
      if (note.isFavorite) dispatch(updateFavorites());
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

export function updateFavorites() {
  return (dispatch: AppDispatch, getState: () => IStore) => {
    const allNotes = getState()
      .data.notebooks.map((n) => n.notes)
      .flat();
    const favorites = allNotes.filter((n) => n.isFavorite);
    dispatch(setFavorites(favorites));
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
      const response = await axios.post(
        `/notes/?notebookId=${notebook._id}`,
        note,
      );
      dispatch(
        addNoteToNotebook({ notebookId: notebook._id, note: response.data }),
      );
      dispatch(setCurrentNote(response.data));
      navigate(`/${slugify(notebook.name)}`);
    } catch (error) {}
  };
}

export function editExistingNote(edit: Partial<Note>) {
  if (edit.content) {
    edit.content = edit.content.replaceAll('<p><br></p>', '<br>');
  }
  return async (dispatch: AppDispatch, getState: () => IStore) => {
    const notebook = getState().data.currentNotebook;
    const note = getState().note.currentNote;
    try {
      if (!notebook || !note) {
        return;
      }
      const response = await axios.put(`/notes/${note._id}`, {
        ...edit,
        updatedAt: new Date(),
      });
      const editedNote = response.data;
      dispatch(replaceNote(editedNote));
      dispatch(updateFavorites());
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
      const response = await axios.patch(`/notes/move-note/${note._id}`, {
        oldNotebookId: currentNotebook._id,
        newNotebookId: target._id,
      });
      const notebooks = response.data as Notebook[];
      const curr = notebooks.find((n) => n._id === target._id) as Notebook;
      dispatch(setCurrentNotebook(curr));
      dispatch(setNotebooks(notebooks));
      if (note.isFavorite) dispatch(updateFavorites());
      dispatch(setActiveNav(`${slugify(target.name)}`));
      navigate(`/${slugify(target.name)}`);
    } catch (error) {}
  };
}
