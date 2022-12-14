import React from 'react';
import { useNavigate } from 'react-router';
import { BsPen, BsTrash } from 'react-icons/bs';
import { SlOptions } from 'react-icons/sl';

import { Notebook } from '../../state/types';
import { slugify } from '../../utils/functions';
import { deleteNotebook } from '../../state/api/notebooks.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import {
  setActiveNav,
  setIsEditingExistingNotebook,
} from '../../state/slices/ui.slice';

export default function NotebookOptions({ notebook }: { notebook: Notebook }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const isEditing = useAppSelector((s) => s.ui.isEditingExistingNotebook);
  const currentNotebook = useAppSelector((s) => s.data.currentNotebook);

  const handleSetRenaming = () => {
    setShow(false);
    if (isEditing) {
      if (currentNotebook?._id !== notebook._id) {
        dispatch(setIsEditingExistingNotebook(false));
        dispatch(setCurrentNotebook(notebook));
      }
    } else {
      dispatch(setCurrentNotebook(notebook));
    }
    dispatch(setIsEditingExistingNotebook(true));
    dispatch(setActiveNav(''));
    navigate(`/${slugify(notebook.name)}`);
  };

  const handleRemoveNotebook = () => {
    if (window.confirm(`Delete ${notebook.name}?`)) {
      dispatch(deleteNotebook(notebook._id, navigate));
    }
  };
  return (
    <>
      {show ? (
        <div
          onMouseLeave={() => setShow(false)}
          style={{
            display: 'flex',
            gap: '15px',
          }}
        >
          <BsPen onClick={handleSetRenaming}></BsPen>
          <BsTrash onClick={handleRemoveNotebook}></BsTrash>
        </div>
      ) : (
        <SlOptions onMouseEnter={() => setShow(true)}></SlOptions>
      )}
    </>
  );
}
