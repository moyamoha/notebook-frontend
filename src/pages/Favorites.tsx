import React from 'react';
import { useNavigate } from 'react-router';
import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import FavoritesList from '../components/notelist/FavoritesList';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setCurrentNotebook } from '../state/slices/data.slice';
import { setCurrentNote } from '../state/slices/note.slice';
import { getNotesNotebook } from '../utils/functions';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useAppSelector((s) => s.data.favorites);
  const notebooks = useAppSelector((s) => s.data.notebooks);
  const currentNote = useAppSelector((s) => s.note.currentNote);
  // const user = useAppSelector((s) => s.user.current);

  React.useEffect(() => {
    // if (currentNote) return;
    if (favorites.length > 0) {
      console.log('tuli tänne');
      dispatch(setCurrentNote(favorites[0]));
      dispatch(
        setCurrentNotebook(getNotesNotebook(notebooks, favorites[0]._id)),
      );
    } else {
      dispatch(setCurrentNotebook(null));
      dispatch(setCurrentNote(null));
    }
  }, [favorites]);
  return (
    <Layout>
      <FavoritesList notes={favorites}></FavoritesList>
      {currentNote ? (
        <RichEditor></RichEditor>
      ) : (
        <EditorPlaceholder></EditorPlaceholder>
      )}
    </Layout>
  );
}
