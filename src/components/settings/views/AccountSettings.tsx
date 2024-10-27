import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';

import { useAppDispatch } from '../../../state/hooks';

Modal.setAppElement('#root');

export default function AccountSettings() {
  const dispatch = useAppDispatch();
  const goto = useNavigate();
  const [showAskConfirm, setShowAskConfirm] = useState(false);
  const [answer, setAnswer] = useState('');

  const changeAnswer = (k: string, value: string) => {
    if (k !== 'answer') return;
    setAnswer(value);
  };

  const handleShowConfirmationModal = () => {
    setShowAskConfirm(true);
  };

  return (
    <>
      <button
        className="settings-btn"
        style={{ backgroundColor: '#F94C66', color: 'white' }}
        onClick={handleShowConfirmationModal}
      >
        Go to account settings
      </button>
    </>
  );
}
