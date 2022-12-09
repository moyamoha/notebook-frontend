import React from 'react';

export default function AccountSettings() {
  return (
    <div style={{ overflowY: 'scroll' }}>
      <h4 style={{ marginTop: '0' }}>Account Settings</h4>
      <h5 style={{ margin: 0, marginBottom: '1rem' }}>Remove account</h5>
      <p style={{ color: '#FFD93D' }}>
        This action is irreversible!! All your date will be removed completely!!
      </p>
      <button
        className="settings-btn"
        style={{ backgroundColor: '#F94C66', color: 'white' }}
      >
        Remove anyway
      </button>
    </div>
  );
}
