import { BsTrash } from 'react-icons/bs';
import { useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import HeartIcon from '../common/HeartIcon';
import Spacer from '../common/Spacer';

export default function NoteOptions() {
  const currentNote = useAppSelector((s) => s.note.currentNote) as Note;
  const handleRemoveNote = () => {};
  return (
    <div className="note-options">
      <div className="note-option" onClick={handleRemoveNote}>
        <BsTrash></BsTrash>
      </div>
      <div className="note-option">
        <HeartIcon note={currentNote as Note}></HeartIcon>
      </div>
      <Spacer></Spacer>
      <div className="note-option">
        <span>{currentNote.updatedAt.toLocaleString()}</span>
      </div>
    </div>
  );
}
