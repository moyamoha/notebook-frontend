import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { noteIsFavorite } from '../../utils/functions';
import { Note } from '../../state/types';

import '../../styles/note-list.css';
import { setCurrentNote } from '../../state/slices/note.slice';
import { editExistingNote } from '../../state/api/notes.api';

export default function HeartIcon({ note }: { note: Note }) {
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const favorites = useAppSelector((s) => s.data.favorites);

  const isNoteInFavorites = React.useMemo(() => {
    return noteIsFavorite(favorites, note._id);
  }, [favorites, currentNote]);

  const handleHeartIconClick = (isFavorite: boolean) => {
    dispatch(setCurrentNote(note));
    dispatch(editExistingNote({ isFavorite: isFavorite }));
  };

  return (
    <>
      {note.isFavorite ? (
        <BsHeartFill
          className="note-row-heart"
          onClick={() => handleHeartIconClick(false)}
        ></BsHeartFill>
      ) : (
        <BsHeart
          className="note-row-heart"
          onClick={() => handleHeartIconClick(true)}
        ></BsHeart>
      )}
    </>
  );
}
