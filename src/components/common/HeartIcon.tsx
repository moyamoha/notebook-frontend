import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';

import '../../styles/note-list.css';

export default function HeartIcon({ note }: { note: Note }) {
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
    <>
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
    </>
  );
}
