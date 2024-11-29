import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

import { Note } from '../../state/types';
import { dateToPrettyString } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { deleteNote, editExistingNote } from '../../state/api/notes.api';
import HeartIcon from '../common/HeartIcon';
import Spacer from '../common/Spacer';
import CopyNote from './actions/CopyNote';
import DownloadNote from './actions/DownloadNote';

import '../../styles/note-options.css';

type NoteOptionsPropsType = {
  editorValue: string;
};

export default function NoteOptions({ editorValue }: NoteOptionsPropsType) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const [showSavedText, setShowSavedText] = useState(false);

  const handleRemoveNote = () => {
    const confirm = window.confirm(`You really want to delete the note?`);
    if (confirm) {
      dispatch(deleteNote());
    }
  };

  const handleSaveNote = () => {
    setShowSavedText(true);
    dispatch(editExistingNote({ content: editorValue }));
    setTimeout(() => setShowSavedText(false), 1000); // Stop rotation after 1 second
  };

  return (
    <div className="note-options">
      <div className="note-option" onClick={handleRemoveNote}>
        <BsTrash></BsTrash>
      </div>
      <div className="note-option">
        <HeartIcon note={currentNote as Note}></HeartIcon>
      </div>
      <CopyNote editorValue={editorValue}></CopyNote>
      <DownloadNote note={currentNote as Note}></DownloadNote>
      <Spacer></Spacer>
      {showSavedText ? (
        <div className="note-option" onClick={handleSaveNote}>
          <span style={{ fontSize: '0.7rem' }}>Saved</span>
          <IoCheckmarkDoneOutline></IoCheckmarkDoneOutline>
        </div>
      ) : (
        <div className="note-option" onClick={handleSaveNote}>
          <span style={{ fontSize: '0.7rem' }}>
            {dateToPrettyString(
              currentNote ? currentNote.updatedAt : new Date(),
            )}
          </span>
          <GrUpdate></GrUpdate>
        </div>
      )}
    </div>
  );
}
