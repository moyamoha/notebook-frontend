import { htmlToText } from 'html-to-text';

import { Note } from '../../state/types';
import { getNFirstWords } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNote } from '../../state/slices/note.slice';
import HeartIcon from '../common/HeartIcon';

import '../../styles/note-list.css';

type NoteRowPropsType = {
  note: Note;
};

export default function NoteRow({ note }: NoteRowPropsType) {
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const dispatch = useAppDispatch();

  const handleNoteClick = () => {
    dispatch(setCurrentNote(note));
  };

  console.log(getNFirstWords(htmlToText(note.content), 6));
  return (
    <div
      className={
        currentNote && currentNote._id === note._id
          ? 'note-row selected'
          : 'note-row'
      }
      onClick={handleNoteClick}
    >
      <span>
        {note.content
          ? getNFirstWords(htmlToText(note.content), 6)
          : 'new note'}
      </span>
      <HeartIcon note={note}></HeartIcon>
    </div>
  );
}
