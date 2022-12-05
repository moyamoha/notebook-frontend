import { useAppSelector } from '../../state/hooks';
import { FavoriteNote, Note } from '../../state/types';
import CreateNote from './CreateNote';
import NoteRow from './NoteRow';

import '../../styles/note-list.css';
import NotelistPlaceholder from './NotelistPlaceholder';
import FavoriteNoteRow from './FavoriteNoteRow';

type NoteListPropsType = {
  notes: FavoriteNote[];
};

export default function FavoritesList({ notes }: NoteListPropsType) {
  // const current = useAppSelector((s) => s.data.currentNotebook);
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
