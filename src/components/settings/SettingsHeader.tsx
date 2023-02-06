import { logout } from '../../state/api/user.api';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import Spacer from '../common/Spacer';

export default function SettingsHeader() {
  const user = useAppSelector((s) => s.user.current);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="settings-header">
      <h4>{user ? `${user.firstname} ${user.lastname}` : 'unknown'}</h4>
      <button className="settings-btn" onClick={handleLogout} disabled={true}>
        Logout
      </button>
      <Spacer></Spacer>
    </section>
  );
}
