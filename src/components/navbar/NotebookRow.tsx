import React from 'react';
import { BsPen, BsTrash } from 'react-icons/bs';
import { SlNotebook, SlOptions } from 'react-icons/sl';
import { NavigateFunction, useNavigate } from 'react-router';
import { deleteNotebook } from '../../state/api/notebooks.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import {
  setActiveNav,
  setIsEditingExistingNotebook,
} from '../../state/slices/ui.slice';
import { Notebook } from '../../state/types';
import { slugify } from '../../utils/functions';
import Spacer from '../common/Spacer';
import NotebookField from './NotebookField';
import NotebookOptions from './NotebookOptions';

export default function NotebookRow({ notebook }: { notebook: Notebook }) {
  const currentNotebook = useAppSelector((s) => s.data.currentNotebook);
  const isEditing = useAppSelector((s) => s.ui.isEditingExistingNotebook);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    // e.stopPropagation();
    if (isEditing) {
      if (currentNotebook?._id !== notebook._id) {
        dispatch(setIsEditingExistingNotebook(false));
        dispatch(setCurrentNotebook(notebook));
      }
    } else {
      dispatch(setCurrentNotebook(notebook));
    }
    dispatch(setActiveNav(`${slugify(notebook.name)}`));
    navigate(`/${slugify(notebook.name)}`);
  };
  return (
    <div
      className={
        currentNotebook?._id === notebook._id ? 'nb-row active' : 'nb-row'
      }
      onClick={(e) => handleClick(e)}
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
