import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getNotebooks } from '../state/api/notebooks.api';
import { getFavorites } from '../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import { getPreferences } from '../state/api/user.api';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentNote = useAppSelector((s) => s.note.currentNote);

  useEffect(() => {
    dispatch(getNotebooks(navigate));
    dispatch(getFavorites());
    dispatch(getPreferences());
  }, []);

  return (
    <Layout>
      {currentNote ? (
        <RichEditor></RichEditor>
      ) : (
        <EditorPlaceholder></EditorPlaceholder>
      )}
    </Layout>
  );
}
