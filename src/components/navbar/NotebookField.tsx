import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { editNotebookName } from '../../state/api/notebooks.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setIsEditingExistingNotebook } from '../../state/slices/ui.slice';

import '../../styles/forms.css';

export default function NotebookField() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const current = useAppSelector((s) => s.data.currentNotebook);
  const [name, setName] = useState(current ? current.name : '');
  const handleRenameNotebook = (e: React.KeyboardEvent) => {
    if (name === '') return;
    if (e.key === 'Enter') {
      dispatch(editNotebookName(name, navigate));
      dispatch(setIsEditingExistingNotebook(false));
    }
  };

  const handleBlur = () => {
    if (name === current?.name) {
      dispatch(setIsEditingExistingNotebook(false));
    } else {
      return;
    }
  };
  return (
    <div className="nb-row">
      <input
        className="nb-input"
        onBlur={handleBlur}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={handleRenameNotebook}
        autoFocus={true}
      ></input>
    </div>
  );
}
