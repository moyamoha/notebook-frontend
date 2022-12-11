import { useAppDispatch } from '../../../state/hooks';
import { removeUserAccount } from '../../../state/api/user.api';

export default function AccountSettings() {
  const dispatch = useAppDispatch();

  const handleRemoveAccount = () => {
    dispatch(removeUserAccount());
  };

  return (
    <div>
      <h4 style={{ marginTop: '0' }}>Account Settings</h4>
      <h5 style={{ margin: 0, marginBottom: '1rem' }}>Remove account</h5>
      <p style={{ color: '#FFD93D' }}>
        This action is irreversible!! All your date will be removed
        completely!!!
      </p>

      <button
        className="settings-btn"
        style={{ backgroundColor: '#F94C66', color: 'white' }}
        onClick={handleRemoveAccount}
      >
        Remove anyway
      </button>
    </div>
  );
}
