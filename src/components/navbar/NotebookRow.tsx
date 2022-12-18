import React from 'react';
import { SlNotebook } from 'react-icons/sl';

import { Note, Notebook } from '../../state/types';
import { noteIsInNotebook, slugify } from '../../utils/functions';
import { NavigateFunction, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import {
  setActiveNav,
  setIsEditingExistingNotebook,
} from '../../state/slices/ui.slice';
import Spacer from '../common/Spacer';
import NotebookField from './NotebookField';
import NotebookOptions from './NotebookOptions';
import { useDrop } from 'react-dnd';
import { moveNoteToNotebook } from '../../state/api/notes.api';

export default function NotebookRow({ notebook }: { notebook: Notebook }) {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const currentNotebook = useAppSelector((s) => s.data.currentNotebook);
  const activeNav = useAppSelector((s) => s.ui.activeNav);
  const isEditing = useAppSelector((s) => s.ui.isEditingExistingNotebook);

  const [, drop] = useDrop(
    () => ({
      accept: 'note',
      canDrop(item: Note, monitor) {
        return noteIsInNotebook(notebook, item._id);
      },
      drop: (item: Note) => {
        dispatch(moveNoteToNotebook(notebook, item, navigate));
      },
    }),
    [notebook],
  );

  const handleClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
    if (isEditing && currentNotebook?._id !== notebook._id) {
      dispatch(setIsEditingExistingNotebook(false));
      dispatch(setCurrentNotebook(notebook));
    } else {
      dispatch(setCurrentNotebook(notebook));
    }
    dispatch(setActiveNav(`${slugify(notebook.name)}`));
    navigate(`/${slugify(notebook.name)}`);
  };
  return (
    <div
      className={
        activeNav === slugify(notebook.name) ? 'nb-row active' : 'nb-row'
      }
      onClick={(e) => handleClick(e)}
      ref={drop}
    >
      <SlNotebook size={15} className="nav-icon"></SlNotebook>
      {isEditing && currentNotebook?._id === notebook._id ? (
        <NotebookField></NotebookField>
      ) : (
        <span>{notebook.name}</span>
      )}
      <Spacer></Spacer>
      <NotebookOptions notebook={notebook}></NotebookOptions>
    </div>
  );
}
