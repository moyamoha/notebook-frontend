import { MdDownload } from 'react-icons/md';

import { downloadUserData } from '../../../state/api/user.api';
import { useAppDispatch } from '../../../state/hooks';

export default function DataManagement() {
  const dispatch = useAppDispatch();

  const handleDownload = () => {
    dispatch(downloadUserData());
  };

  return (
    <div id="data-management">
      <h4 style={{ margin: 0, marginBottom: '1rem' }}>Data Management</h4>
      <button
        className="settings-btn"
        style={{ backgroundColor: 'darkorange', marginBottom: '1rem' }}
        onClick={handleDownload}
      >
        <MdDownload></MdDownload> Download your data as Json file
      </button>
    </div>
  );
}
