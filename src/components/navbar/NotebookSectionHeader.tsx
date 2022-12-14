import { MdOutlineExpandMore } from 'react-icons/md';
import { BiLayer, BiChevronRight } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setExpandNotebooks } from '../../state/slices/ui.slice';
import NewNotebookIcon from './NewNotebookIcon';

export default function NotebookSectionHeader() {
  const notebooks = useAppSelector((s) => s.data.notebooks);
  const expand = useAppSelector((s) => s.ui.expandNotebooks);
  const dispatch = useAppDispatch();
  return (
    <div className="nb-section">
      {notebooks.length > 0 ? (
        expand ? (
          <MdOutlineExpandMore
            className="nav-icon"
            size={25}
            onClick={() => dispatch(setExpandNotebooks(!expand))}
          ></MdOutlineExpandMore>
        ) : (
          <BiChevronRight
            size={25}
            className="nav-icon"
            onClick={() => dispatch(setExpandNotebooks(!expand))}
          />
        )
      ) : (
        <BiLayer></BiLayer>
      )}
      <span>Your notebooks</span>
      <NewNotebookIcon></NewNotebookIcon>
    </div>
  );
}
