import { Routes } from '@shared/routes';

import { SidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<SidebarItem & { shouldHaveNotionData: boolean }> = [
  { name: 'Home', href: Routes.HOME, shouldHaveNotionData: false },
  { name: 'Dashboard', href: Routes.DASHBOARD, shouldHaveNotionData: true },
  { name: 'Find word', href: Routes.FIND_WORD, shouldHaveNotionData: false },
  { name: 'Add word', href: Routes.ADD_WORD, shouldHaveNotionData: true },
  {
    name: 'Account Settings',
    href: Routes.ACCOUNT_SETTINGS,
    shouldHaveNotionData: true,
  },
  {
    name: 'Privacy Policy',
    href: Routes.PRIVACY_POLICY,
    shouldHaveNotionData: false,
  },
  {
    name: 'Terms & Conditions',
    href: Routes.TERMS,
    shouldHaveNotionData: false,
  },
  {
    name: 'Donate',
    href: Routes.DONATE,
    shouldHaveNotionData: true,
  },
];
