import { FiCompass, FiHome, FiTrendingUp } from 'react-icons/fi';

import { ERoutes } from '@infrastructure/types/routes';

import { ISidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<ISidebarItem & { shouldHaveNotionData: boolean }> = [
  { name: 'Home', icon: FiHome, href: ERoutes.HOME, shouldHaveNotionData: false },
  { name: 'Dashboard', icon: FiHome, href: ERoutes.DASHBOARD, shouldHaveNotionData: true },
  {
    name: 'Privacy & Policy',
    icon: FiTrendingUp,
    href: ERoutes.PRIVACY_POLICY,
    shouldHaveNotionData: false,
  },
  { name: 'Terms & Conditions', icon: FiCompass, href: ERoutes.TERMS, shouldHaveNotionData: false },
];
