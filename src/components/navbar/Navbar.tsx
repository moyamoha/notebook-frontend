import { useSelector } from 'react-redux';

import { IStore } from '../../state/types';
import { useAppSelector } from '../../state/hooks';
import NotebookSectionHeader from './NotebookSectionHeader';
import NotebookRow from './NotebookRow';
import NewNotebookField from './NewNotebookField';
import FavoritesBtn from './FavoritesBtn';
import SettingsBtn from './SettingsBtn';

import '../../styles/navbar.css';

export default function Navbar() {
  const notebooks = useSelector((s: IStore) => s.data.notebooks);
  const expand = useAppSelector((s) => s.ui.expandNotebooks);
  const isCreating = useAppSelector((s) => s.ui.isCreatingNew);
  return (
    <div className="navbar">
      <NotebookSectionHeader></NotebookSectionHeader>
      <div className={notebooks.length > 0 ? 'nb-cont' : ''}>
        {expand ? (
          <>
            {notebooks.map((nb) => (
              <NotebookRow key={nb._id} notebook={nb}></NotebookRow>
            ))}
          </>
        ) : (
          <></>
        )}
        {isCreating ? <NewNotebookField></NewNotebookField> : <></>}
      </div>
      <div>
        <FavoritesBtn></FavoritesBtn>
        <SettingsBtn></SettingsBtn>
      </div>
    </div>
  );
}
