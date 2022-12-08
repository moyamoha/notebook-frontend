import React from 'react';
import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import NoteList from '../components/notelist/NoteList';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setCurrentNote } from '../state/slices/note.slice';

export default function Notebook() {
  const current = useAppSelector((s) => s.data.currentNotebook);
  const currentNote = useAppSelector((s) => s.note.currentNote);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      setCurrentNote(
        current && current.notes.length > 0 ? current.notes[0] : null,
      ),
    );
  }, [current]);

  return (
    <Layout>
      <NoteList
        showNotebookName={false}
        notes={current ? current.notes : []}
        canAddNew={true}
      ></NoteList>
      {currentNote ? (
        <RichEditor></RichEditor>
      ) : (
        <EditorPlaceholder></EditorPlaceholder>
      )}
    </Layout>
  );
}
