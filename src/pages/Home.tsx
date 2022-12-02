import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import RichEditor from '../components/editor/RichEditor';
import Layout from '../components/layout/Layout';
import { getNotebooks } from '../state/api/notebooks.api';
import { getFavorites } from '../state/api/notes.api';
import { useAppDispatch } from '../state/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNotebooks(navigate));
    dispatch(getFavorites());
  }, []);

  return (
    <Layout>
      <RichEditor></RichEditor>
    </Layout>
  );
}
