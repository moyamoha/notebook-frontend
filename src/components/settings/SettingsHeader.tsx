import { AiOutlineClose } from 'react-icons/ai';
import { logout } from '../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setShowSettingsModal } from '../../state/slices/ui.slice';
import Spacer from '../common/Spacer';

export default function SettingsHeader() {
  const user = useAppSelector((s) => s.user.current);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowSettingsModal(false));
  };

  const handleCloseModal = () => {
    dispatch(setShowSettingsModal(false));
  };

  return (
    <section className="settings-header">
      <h4>{user ? `${user.firstname} ${user.lastname}` : 'unknown'}</h4>
      <button className="settings-btn" onClick={handleLogout}>
        Logout
      </button>
      <Spacer></Spacer>
      <AiOutlineClose
        className="modal-close-icon"
        onClick={handleCloseModal}
        size={30}
      ></AiOutlineClose>
    </section>
  );
}
