import { FavoriteNote, Note } from '../../state/types';
import NotelistPlaceholder from './NotelistPlaceholder';
import FavoriteNoteRow from './FavoriteNoteRow';

import '../../styles/note-list.css';

type NoteListPropsType = {
  notes: Note[];
};

export default function FavoritesList({ notes }: NoteListPropsType) {
  return (
    <div className="note-list">
      {notes.length > 0 ? (
        notes.map((n) => (
          <FavoriteNoteRow note={n} key={n._id}></FavoriteNoteRow>
        ))
      ) : (
        <NotelistPlaceholder canAddNew={false}></NotelistPlaceholder>
      )}
    </div>
  );
}
