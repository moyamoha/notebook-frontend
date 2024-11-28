import { RiAccountCircleLine } from 'react-icons/ri';
import { AUTH_URL, SITE_URL } from '../../utils/constants';

export default function AccountSettingsBtn() {
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
