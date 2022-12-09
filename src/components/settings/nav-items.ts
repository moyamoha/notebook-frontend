import { MdRoomPreferences } from 'react-icons/md';
import About from './views/About';
import AccountSettings from './views/AccountSettings';
import DataManagement from './views/DataManagement';
import Preferences from './views/Preferences';

export type SettingsNavItem = {
  value: string;
  text: string;
  element: JSX.Element;
};

export const navItems: SettingsNavItem[] = [
  {
    value: 'preferences',
    text: 'Preferences',
    element: Preferences(),
  },
  {
    value: 'account',
    text: 'Account settings',
    element: AccountSettings(),
  },
  {
    value: 'data',
    text: 'Data management',
    element: DataManagement(),
  },
  {
    value: 'about',
    text: 'About this app',
    element: About(),
  },
];
