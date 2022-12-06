import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import NoteList from '../components/notelist/NoteList';
import { useAppDispatch, useAppSelector } from '../state/hooks';

export default function Notebook() {
  const current = useAppSelector((s) => s.data.currentNotebook);
  const currentNote = useAppSelector((s) => s.note.currentNote);
  console.log(currentNote);
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
