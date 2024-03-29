import { useNavigate } from 'react-router';
import { BsPlusCircle } from 'react-icons/bs';

import { createNewNote } from '../../state/api/notes.api';
import { useAppDispatch } from '../../state/hooks';

export default function CreateNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateNewNote = () => {
    const n = {
      content: '<h1>New note<h2>',
    };
    dispatch(createNewNote(n, navigate));
  };

  return (
    <div className="create-note">
      <BsPlusCircle
        size={25}
        className="create-note-icon"
        onClick={handleCreateNewNote}
        title="create a new note"
      ></BsPlusCircle>
    </div>
  );
}
