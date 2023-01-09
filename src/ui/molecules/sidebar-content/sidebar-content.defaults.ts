import { FiHome } from 'react-icons/fi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { TiDocumentText } from 'react-icons/ti';

import { ERoutes } from '@infrastructure/types/routes';

import { ISidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<ISidebarItem & { shouldHaveNotionData: boolean }> = [
  { name: 'Home', icon: FiHome, href: ERoutes.HOME, shouldHaveNotionData: false },
  { name: 'Dashboard', icon: RxDashboard, href: ERoutes.DASHBOARD, shouldHaveNotionData: true },
  {
    name: 'Privacy & Policy',
    icon: MdOutlinePrivacyTip,
    href: ERoutes.PRIVACY_POLICY,
    shouldHaveNotionData: false,
  },
  {
    name: 'Terms & Conditions',
    icon: TiDocumentText,
    href: ERoutes.TERMS,
    shouldHaveNotionData: false,
  },
];
