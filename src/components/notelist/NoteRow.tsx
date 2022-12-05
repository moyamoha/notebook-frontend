import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import '../../styles/note-list.css';
import { getNotesNotebookName, getTwoFirstWords } from '../../utils/functions';

type NoteRowPropsType = {
  note: Note;
};

export default function NoteRow({ note }: NoteRowPropsType) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.data.favorites);
  const isNoteInFavorites = React.useMemo(
    () => favorites.findIndex((fn) => fn._id === note._id) !== -1,
    [favorites],
  );

  const handleHeartClick = () => {
    dispatch(addToFavorites(note));
  };
  const handleHeartFillClick = () => {
    dispatch(removeFromFavorites(note._id));
  };

  return (
    <div className="note-row">
      <span>
        {note.content ? getTwoFirstWords(htmlToText(note.content)) : 'new note'}
      </span>
      {isNoteInFavorites ? (
        <BsHeartFill
          className="note-row-heart"
          onClick={handleHeartFillClick}
        ></BsHeartFill>
      ) : (
        <BsHeart
          className="note-row-heart"
          onClick={handleHeartClick}
        ></BsHeart>
      )}
    </div>
  );
}
