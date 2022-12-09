import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveNav,
  setShowSettingsModal,
} from '../../state/slices/ui.slice';

export default function SettingsBtn() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setShowSettingsModal(true));
  };
  return (
    <div className="nav-line" onClick={handleClick}>
      <AiOutlineSetting className="nav-icon"></AiOutlineSetting>
      <span className="nav-text">Settings</span>
    </div>
  );
}
