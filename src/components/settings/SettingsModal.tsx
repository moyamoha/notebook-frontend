import React from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { logout } from '../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setShowSettingsModal } from '../../state/slices/ui.slice';
import SettingView from './views/Index';

import '../../styles/settings.css';
import { navItems, SettingsNavItem } from './nav-items';
import SettingsHeader from './SettingsHeader';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('.App');

export default function SettingsModal() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);
  const showSettingsModal = useAppSelector((s) => s.ui.showSettingsModal);
  const [selected, setSelected] = React.useState<SettingsNavItem>(navItems[0]);

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    }
  }, [user]);

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
        <section className="settings-nav">
          {navItems.map((ni) => (
            <div
              className={
                selected.value === ni.value
                  ? 'settings-nav-item selected'
                  : 'settings-nav-item'
              }
              key={ni.value}
              onClick={() => setSelected(ni)}
            >
              {ni.text}
            </div>
          ))}
        </section>
        <section className="settings-body">
          <SettingView viewName={selected.value}></SettingView>
        </section>
      </section>
    </Modal>
  );
}
