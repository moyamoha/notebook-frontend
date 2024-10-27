import React from 'react';

import { navItems, SettingsNavItem } from '../components/settings/nav-items';
import Layout from '../components/layout/Layout';
import SettingsHeader from '../components/settings/SettingsHeader';
import About from '../components/settings/views/About';
import DataManagement from '../components/settings/views/DataManagement';
import Preferences from '../components/settings/views/Preferences';

import '../styles/settings.css';
import { useAppDispatch } from '../state/hooks';
import { fetchProfile } from '../state/api/user.api';

export default function Settings() {
  const [selected, setSelected] = React.useState<SettingsNavItem>(navItems[0]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <Layout>
      <div className="settings-page">
        <SettingsHeader></SettingsHeader>
        <section className="settings-main">
          <section className="settings-nav">
            {navItems.map((ni) => (
              <div
                className={
                  selected.value === ni.value
                    ? 'settings-nav-item selected'
                    : 'settings-nav-item'
                }
                key={ni.value}
                onClick={() => setSelected(ni)}
              >
                {ni.text}
              </div>
            ))}
          </section>
          <section className="settings-body">
            {selected.value === 'preferences' ? (
              <Preferences></Preferences>
            ) : (
              <></>
            )}
            {selected.value === 'about' ? <About></About> : <></>}
            {selected.value === 'data' ? (
              <DataManagement></DataManagement>
            ) : (
              <></>
            )}
          </section>
        </section>
      </div>
    </Layout>
  );
}
