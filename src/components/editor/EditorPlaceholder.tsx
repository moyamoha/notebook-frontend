import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router';

import { createNewNote } from '../../state/api/notes.api';
import { useAppDispatch } from '../../state/hooks';

import '../../styles/editor.css';

export default function EditorPlaceholder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateNewNote = () => {
    const n = {
      content: '<h1>New note<h2>',
    };
    dispatch(createNewNote(n, navigate));
  };

  return (
    <div className="editor-placeholder">
      <span>Please select a note to display!</span>
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <span>Or create one</span>
        <BiPlus
          style={{
            cursor: 'pointer',
            marginLeft: '1rem',
            color: 'blueviolet',
          }}
          onClick={handleCreateNewNote}
          size={25}
        ></BiPlus>
      </div>
    </div>
  );
}
