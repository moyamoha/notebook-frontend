import React from 'react';
import Layout from '../components/layout/Layout';
import { navItems, SettingsNavItem } from '../components/settings/nav-items';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingView from '../components/settings/views/Index';

import '../styles/settings.css';

export default function Settings() {
  const [selected, setSelected] = React.useState<SettingsNavItem>(navItems[0]);
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
            <SettingView viewName={selected.value}></SettingView>
          </section>
        </section>
      </div>
    </Layout>
  );
}
