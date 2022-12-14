import React, { useState } from 'react';

import { useAppDispatch } from '../../state/hooks';
import { createNotebook } from '../../state/api/notebooks.api';
import { setIsCreatingNew } from '../../state/slices/ui.slice';

import '../../styles/forms.css';

export default function NewNotebookField() {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const handleCreateNb = (e: React.KeyboardEvent) => {
    if (name === '') return;
    if (e.key === 'Enter') {
      dispatch(createNotebook(name));
      dispatch(setIsCreatingNew(false));
    }
  };

  const handleBlur = () => {
    dispatch(setIsCreatingNew(false));
  };
  return (
    <div className="nb-row" onBlur={handleBlur}>
      <input
        className="nb-input new"
        type="text"
        value={name}
        autoFocus={true}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={handleCreateNb}
      ></input>
    </div>
  );
}
