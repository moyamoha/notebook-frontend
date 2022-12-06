import { BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { createNewNote } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { addNoteToNotebook } from '../../state/slices/data.slice';

export default function CreateNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentNotebook = useAppSelector((s) => s.data.currentNotebook);
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
