import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';

import { Note } from '../../state/types';
import { dateToPrettyString } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { deleteNote, editExistingNote } from '../../state/api/notes.api';
import HeartIcon from '../common/HeartIcon';
import Spacer from '../common/Spacer';
import { htmlToText } from 'html-to-text';

type NoteOptionsPropsType = {
  editorValue: string;
};

export default function NoteOptions({ editorValue }: NoteOptionsPropsType) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const copyNoteAsTextOnly = useAppSelector(
    (s) => s.user.profile.copyNoteAsTextOnly,
  );
  const [showCopied, setShowCopied] = useState(false);

  const handleRemoveNote = () => {
    const confirm = window.confirm(`You really want to delete the note?`);
    if (confirm) {
      dispatch(deleteNote());
    }
  };

  const handleSaveNote = () => {
    dispatch(editExistingNote(editorValue));
  };

  const handleCopyNote = () => {
    if (showCopied) return;
    const textToCopy = copyNoteAsTextOnly
      ? htmlToText(editorValue)
      : editorValue;
    console.log(textToCopy);
    window.navigator.clipboard.writeText(textToCopy);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="note-options">
      <div className="note-option" onClick={handleRemoveNote}>
        <BsTrash></BsTrash>
      </div>
      <div className="note-option">
        <HeartIcon note={currentNote as Note}></HeartIcon>
      </div>
      <div className="note-option">
        {/* <BiCopy onClick={handleCopyNote}></BiCopy> */}
        {showCopied ? (
          <>
            <AiOutlineCheck></AiOutlineCheck>
            <span style={{ fontSize: '0.7rem' }}>Copied</span>
          </>
        ) : (
          <BiCopy onClick={handleCopyNote}></BiCopy>
        )}
      </div>
      <Spacer></Spacer>
      <div className="note-option" onClick={handleSaveNote}>
        <span style={{ fontSize: '0.7rem' }}>
          {dateToPrettyString(currentNote ? currentNote.updatedAt : new Date())}
        </span>
        <GrUpdate></GrUpdate>
      </div>
    </div>
  );
}
