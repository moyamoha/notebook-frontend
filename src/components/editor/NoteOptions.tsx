import { BsTrash } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import { deleteNote, editExistingNote } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import { dateToPrettyString } from '../../utils/functions';
import HeartIcon from '../common/HeartIcon';
import Spacer from '../common/Spacer';

type NoteOptionsPropsType = {
  note: Note;
  editorValue: string;
};

export default function NoteOptions({
  note,
  editorValue,
}: NoteOptionsPropsType) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);

  const handleRemoveNote = () => {
    const confirm = window.confirm(`You really want to delete the note?`);
    if (confirm) {
      dispatch(deleteNote());
    }
  };

  const handleSaveNote = () => {
    dispatch(editExistingNote(editorValue));
  };

  return (
    <div className="note-options">
      <div className="note-option" onClick={handleRemoveNote}>
        <BsTrash></BsTrash>
      </div>
      <div className="note-option">
        <HeartIcon note={currentNote as Note}></HeartIcon>
      </div>
      <Spacer></Spacer>
      <div className="note-option" onClick={handleSaveNote}>
        <span style={{ fontSize: '0.7rem' }}>
          {dateToPrettyString(note.updatedAt)}
        </span>
        <GrUpdate></GrUpdate>
      </div>
    </div>
  );
}
