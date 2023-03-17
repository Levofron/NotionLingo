import { ERoutes } from '@infrastructure/types/routes';

import { ISidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<ISidebarItem & { shouldHaveNotionData: boolean }> = [
  { name: 'Home', href: ERoutes.HOME, shouldHaveNotionData: false },
  { name: 'Dashboard', href: ERoutes.DASHBOARD, shouldHaveNotionData: true },
  { name: 'Find word', href: ERoutes.FIND_WORD, shouldHaveNotionData: false },
  { name: 'Add word', href: ERoutes.ADD_WORD, shouldHaveNotionData: true },
  {
    name: 'Account Settings',
    href: ERoutes.ACCOUNT_SETTINGS,
    shouldHaveNotionData: true,
  },
  {
    name: 'Privacy Policy',
    href: ERoutes.PRIVACY_POLICY,
    shouldHaveNotionData: false,
  },
  {
    name: 'Terms & Conditions',
    href: ERoutes.TERMS,
    shouldHaveNotionData: false,
  },
  {
    name: 'Donate',
    href: ERoutes.DONATE,
    shouldHaveNotionData: true,
  },
];
