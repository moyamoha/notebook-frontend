import { useAppSelector } from '../../state/hooks';
import { Note } from '../../state/types';
import CreateNote from './CreateNote';
import NoteRow from './NoteRow';

import '../../styles/note-list.css';
import NotelistPlaceholder from './NotelistPlaceholder';

type NoteListPropsType = {
  notes: Note[];
  canAddNew: boolean;
};

export default function NoteList({ notes, canAddNew }: NoteListPropsType) {
  const current = useAppSelector((s) => s.data.currentNotebook);
  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((n) => <NoteRow note={n} key={n._id}></NoteRow>)
      ) : (
        <NotelistPlaceholder canAddNew={canAddNew}></NotelistPlaceholder>
      )}
      {canAddNew && <CreateNote></CreateNote>}
    </div>
  );
}
