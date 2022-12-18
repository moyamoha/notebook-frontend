import { htmlToText } from 'html-to-text';

import { Note } from '../../state/types';
import { getNFirstWords } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setCurrentNote } from '../../state/slices/note.slice';
import HeartIcon from '../common/HeartIcon';

import '../../styles/note-list.css';
import { useDrag } from 'react-dnd';

type NoteRowPropsType = {
  note: Note;
};

export default function NoteRow({ note }: NoteRowPropsType) {
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'note',
      item: { ...note },
      collect: (monitor) => ({
        // isDragging: !!monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );
  const dispatch = useAppDispatch();

  const handleNoteClick = () => {
    dispatch(setCurrentNote(note));
  };

  return (
    <div
      className={
        currentNote && currentNote._id === note._id
          ? 'note-row selected'
          : 'note-row'
      }
      onClick={handleNoteClick}
      ref={dragRef}
      style={{ opacity }}
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
