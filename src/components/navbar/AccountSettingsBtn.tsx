import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AiOutlineSetting } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useAppSelector } from '../../state/hooks';
import { AUTH_URL, SITE_URL } from '../../utils/constants';

export default function AccountSettingsBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeNav = useAppSelector((s) => s.ui.activeNav);

  const handleClick = () => {
    const token = window.localStorage.getItem('accessToken');
    window.location.href = `${AUTH_URL}/?redirect=${SITE_URL}&token=${token}`;
  };

  return (
    <div className="nav-line" onClick={handleClick}>
      <RiAccountCircleLine className="nav-icon"></RiAccountCircleLine>
      <span className="nav-text">Account</span>
    </div>
  );
}
