import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNav } from '../../state/slices/ui.slice';
import { IStore } from '../../state/types';

export default function () {
  const activeNav = useSelector((s: IStore) => s.ui.activeNav);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (activeNav !== 'settings') {
      dispatch(setActiveNav('settings'));
    }
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
