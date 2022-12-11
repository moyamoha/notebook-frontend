import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../state/hooks';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import { setActiveNav } from '../../state/slices/ui.slice';

export default function SettingsBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeNav = useAppSelector((s) => s.ui.activeNav);

  const handleClick = () => {
    dispatch(setActiveNav('settings'));
    dispatch(setCurrentNotebook(null));
    dispatch(setCurrentNotebook(null));
    navigate('/settings');
  };
  return (
    <div
      className={activeNav === 'settings' ? 'active nav-line' : 'nav-line'}
      onClick={handleClick}
    >
      <AiOutlineSetting className="nav-icon"></AiOutlineSetting>
      <span className="nav-text">Settings</span>
    </div>
  );
}
