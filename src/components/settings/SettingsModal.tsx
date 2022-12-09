import { useEffect } from 'react';
import Modal from 'react-modal';
import { logout } from '../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setShowSettingsModal } from '../../state/slices/ui.slice';

import '../../styles/settings.css';
import SettingsHeader from './SettingsHeader';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('.App');

export default function SettingsModal() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);
  const showSettingsModal = useAppSelector((s) => s.ui.showSettingsModal);

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  function afterOpenModal() {}

  function closeModal() {
    dispatch(setShowSettingsModal(false));
  }

  return (
    <Modal
      isOpen={showSettingsModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className="settings-modal"
    >
      <SettingsHeader></SettingsHeader>
      <section className="settings-main">
        <section className="settings-nav"></section>
        <section className="settings-body"></section>
      </section>
    </Modal>
  );
}
