import { htmlToText } from 'html-to-text';
import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import '../../styles/note-list.css';
import { getTwoFirstWords } from '../../utils/functions';
import { getTextFromHtmlString } from '../../utils/htmlToText';

export default function NoteRow({ note }: { note: Note }) {
  const favorites = useAppSelector((s) => s.data.favorites);
  const isNoteInFavorites = React.useMemo(
    () => favorites.findIndex((fn) => fn._id === note._id) !== -1,
    [favorites],
  );

  const handleHeartClick = () => {};
  const handleHeartFillClick = () => {};

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
