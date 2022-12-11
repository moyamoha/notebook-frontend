import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addToFavorites, removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';

import '../../styles/note-list.css';
import { noteIsFavorite } from '../../utils/functions';

export default function HeartIcon({ note }: { note: Note }) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const favorites = useAppSelector((s) => s.data.favorites);

  const isNoteInFavorites = React.useMemo(() => {
    return noteIsFavorite(favorites, note._id);
  }, [favorites, currentNote]);

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
