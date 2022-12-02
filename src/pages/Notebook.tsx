import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import NoteList from '../components/notelist/NoteList';
import { useAppDispatch, useAppSelector } from '../state/hooks';

export default function Notebook() {
  const current = useAppSelector((s) => s.data.currentNotebook);
  return (
    <Layout>
      <NoteList
        notes={current ? current.notes : []}
        canAddNew={true}
      ></NoteList>
      <RichEditor></RichEditor>
    </Layout>
  );
}
