import { htmlToText } from 'html-to-text';
import { BsHeartFill } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { removeFromFavorites } from '../../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import { setCurrentNote } from '../../state/slices/note.slice';
import { Note } from '../../state/types';
import { getNotesNotebook, getNFirstWords } from '../../utils/functions';

import '../../styles/note-list.css';

type NoteRowPropsType = {
  note: Note;
};

export default function FavoriteNoteRow({ note }: NoteRowPropsType) {
  const dispatch = useAppDispatch();
  const notebooks = useAppSelector((s) => s.data.notebooks);
  const currentNote = useAppSelector((s) => s.note.currentNote);

  const handleHeartFillClick = () => {
    dispatch(removeFromFavorites(note._id));
  };

  const handleFavoriteClick = () => {
    dispatch(setCurrentNote(note));
    dispatch(setCurrentNotebook(getNotesNotebook(notebooks, note._id)));
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
        <span>{getNFirstWords(htmlToText(note.content), 6)}</span>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            fontSize: '0.75rem',
          }}
        >
          <SlNotebook size={15}></SlNotebook>
          <span>{getNotesNotebook(notebooks, note._id)?.name}</span>
        </div>
      </div>

      <BsHeartFill
        className="note-row-heart"
        onClick={handleHeartFillClick}
      ></BsHeartFill>
    </div>
  );
}
