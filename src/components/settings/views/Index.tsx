import React from 'react';
import { SettingViewValue } from '../nav-items';
import About from './About';
import AccountSettings from './AccountSettings';
import DataManagement from './DataManagement';
import Preferences from './Preferences';

export default function Index({ viewName }: { viewName: SettingViewValue }) {
  return (
    <>
      {viewName === 'preferences' ? <Preferences></Preferences> : <></>}
      {viewName === 'about' ? <About></About> : <></>}
      {viewName === 'account' ? <AccountSettings></AccountSettings> : <></>}
      {viewName === 'data' ? <DataManagement></DataManagement> : <></>}
    </>
  );
}
