import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';

import { logout, removeUserAccount } from '../../../state/api/user.api';
import { useAppDispatch } from '../../../state/hooks';
import TextInput from '../../forms/TextInput';
import { MdOutlineClose } from 'react-icons/md';

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

  const handleRemoveCompletely = () => {
    if (answer === 'delete my account') {
      dispatch(removeUserAccount(goto));
    } else {
      alert('Wrong answer');
      setShowAskConfirm(false);
    }
  };

  const handleShowConfirmationModal = () => {
    setShowAskConfirm(true);
  };

  return (
    <>
      <Modal
        isOpen={showAskConfirm}
        onRequestClose={() => setShowAskConfirm(false)}
        className="confirmation-modal"
      >
        <TextInput
          value={answer}
          label="Please type delete my account"
          setState={changeAnswer}
          field="answer"
        ></TextInput>
        <button
          onClick={handleRemoveCompletely}
          style={{ backgroundColor: 'greenyellow', color: 'black' }}
          className="settings-btn"
        >
          Delete completely
        </button>
        <MdOutlineClose
          style={{ position: 'absolute', top: '5px', right: '5px' }}
          size={20}
          onClick={() => setShowAskConfirm(false)}
        ></MdOutlineClose>
      </Modal>
      <h4 style={{ marginTop: '0' }}>Account Settings</h4>
      <h5 style={{ margin: 0, marginBottom: '1rem' }}>Remove account</h5>
      <p style={{ color: '#FFD93D' }}>
        This action is irreversible!! All your date will be removed
        completely!!!
      </p>

      <button
        className="settings-btn"
        style={{ backgroundColor: '#F94C66', color: 'white' }}
        onClick={handleShowConfirmationModal}
      >
        Remove anyway
      </button>
    </>
  );
}
