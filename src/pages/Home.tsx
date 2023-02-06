import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getNotebooks } from '../state/api/notebooks.api';
import { updateFavorites } from '../state/api/notes.api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import EditorPlaceholder from '../components/editor/EditorPlaceholder';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import { getPreferences, loginWithDemoUser } from '../state/api/user.api';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentNote = useAppSelector((s) => s.note.currentNote);

  useEffect(() => {
    dispatch(loginWithDemoUser());
    dispatch(getNotebooks(navigate));
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
