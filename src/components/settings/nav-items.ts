export type SettingViewValue = 'preferences' | 'about' | 'data' | 'account';

export type SettingsNavItem = {
  value: SettingViewValue;
  text: string;
};

export const navItems: SettingsNavItem[] = [
  {
    value: 'preferences',
    text: 'Preferences',
  },
  {
    value: 'data',
    text: 'Data management',
  },
  {
    value: 'about',
    text: 'About this app',
  },
];
