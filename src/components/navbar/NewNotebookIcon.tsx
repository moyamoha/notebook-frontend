import { BiPlus } from 'react-icons/bi';

import { useAppDispatch } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import { setIsCreatingNew } from '../../state/slices/ui.slice';

export default function NewNotebookIcon() {
  const dispatch = useAppDispatch();
  const createNewNotebook = () => {
    dispatch(setIsCreatingNew(true));
    setCurrentNotebook(null);
  };
  return (
    <BiPlus
      className="nav-icon"
      size={25}
      style={{ marginLeft: 'auto' }}
      onClick={createNewNotebook}
    ></BiPlus>
  );
}
