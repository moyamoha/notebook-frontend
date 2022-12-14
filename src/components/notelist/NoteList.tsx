import { Note } from '../../state/types';
import CreateNote from './CreateNote';
import NoteRow from './NoteRow';
import NotelistPlaceholder from './NotelistPlaceholder';

import '../../styles/note-list.css';

type NoteListPropsType = {
  notes: Note[];
  canAddNew: boolean;
  showNotebookName: boolean;
};

export default function NoteList({ notes, canAddNew }: NoteListPropsType) {
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
