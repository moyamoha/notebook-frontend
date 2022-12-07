import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNote } from '../../state/slices/note.slice';
import { FavoriteNote, Note } from '../../state/types';
import '../../styles/note-list.css';
import { getNotesNotebookName, getTwoFirstWords } from '../../utils/functions';

type NoteRowPropsType = {
  note: FavoriteNote;
};

export default function FavoriteNoteRow({ note }: NoteRowPropsType) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);

  const handleHeartFillClick = () => {
    dispatch(removeFromFavorites(note._id));
  };

  const handleFavoriteClick = () => {
    const n = {
      _id: note._id,
      content: note.content,
      writer: note.writer,
      updatedAt: note.updatedAt,
    };
    dispatch(setCurrentNote(n));
  };

  return (
    <div
      className={
        currentNote && currentNote._id === note._id
          ? 'note-row selected'
          : 'note-row'
      }
      onClick={handleFavoriteClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>{getTwoFirstWords(htmlToText(note.content))}</span>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            fontSize: '0.75rem',
          }}
        >
          <SlNotebook size={15}></SlNotebook>
          <span>{note.notebookName}</span>
        </div>
      </div>

      <BsHeartFill
        className="note-row-heart"
        onClick={handleHeartFillClick}
      ></BsHeartFill>
    </div>
  );
}
