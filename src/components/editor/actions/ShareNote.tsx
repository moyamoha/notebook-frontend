import React from 'react';
import { BiShare } from 'react-icons/bi';
import { writeBlog } from '../../../state/api/notes.api';

import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { admin } from '../../../utils/constants';

export default function ShareNote({ editorValue }: { editorValue: string }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);

  const userIsAdmin = React.useMemo(() => {
    return user?.email === admin;
  }, [user]);

  const handleShareNote = () => {
    dispatch(writeBlog(editorValue));
  };

  return userIsAdmin ? (
    <div className="note-option" onClick={handleShareNote}>
      <BiShare size={15}></BiShare>
    </div>
  ) : (
    <></>
  );
}
