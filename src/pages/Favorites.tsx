import React from 'react';
import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import FavoritesList from '../components/notelist/FavoritesList';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { setCurrentNotebook } from '../state/slices/data.slice';
import { setCurrentNote } from '../state/slices/note.slice';

export default function Notebook() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.data.favorites);
  const currentNote = useAppSelector((s) => s.note.currentNote);

  React.useEffect(() => {
    if (favorites.length > 0) {
      dispatch(setCurrentNote(favorites[0]));
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
