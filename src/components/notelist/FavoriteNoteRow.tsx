import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { FavoriteNote, Note } from '../../state/types';
import '../../styles/note-list.css';
import { getNotesNotebookName, getTwoFirstWords } from '../../utils/functions';

type NoteRowPropsType = {
  note: FavoriteNote;
};

export default function FavoriteNoteRow({ note }: NoteRowPropsType) {
  const dispatch = useAppDispatch();

  const handleHeartFillClick = () => {
    dispatch(removeFromFavorites(note._id));
  };

  return (
    <div className="note-row">
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
