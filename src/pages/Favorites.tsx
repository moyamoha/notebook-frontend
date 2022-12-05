import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import FavoritesList from '../components/notelist/FavoritesList';
import NoteList from '../components/notelist/NoteList';
import { useAppSelector } from '../state/hooks';

export default function Notebook() {
  const favorites = useAppSelector((s) => s.data.favorites);
  return (
    <Layout>
      <FavoritesList notes={favorites}></FavoritesList>
      <RichEditor></RichEditor>
    </Layout>
  );
}
