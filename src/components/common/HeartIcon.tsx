import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { Note } from '../../state/types';
import { useAppDispatch } from '../../state/hooks';
import { editExistingNote } from '../../state/api/notes.api';
import { setCurrentNote } from '../../state/slices/note.slice';

import '../../styles/note-list.css';

export default function HeartIcon({ note }: { note: Note }) {
  const dispatch = useAppDispatch();

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
