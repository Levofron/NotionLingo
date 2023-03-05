import { BiAddToQueue, BiDonateHeart, BiFileFind } from 'react-icons/bi';
import { FiHome, FiSettings } from 'react-icons/fi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { TiDocumentText } from 'react-icons/ti';

import { ERoutes } from '@infrastructure/types/routes';

import { ISidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<ISidebarItem & { shouldHaveNotionData: boolean }> = [
  { name: 'Home', icon: FiHome, href: ERoutes.HOME, shouldHaveNotionData: false },
  { name: 'Dashboard', icon: RxDashboard, href: ERoutes.DASHBOARD, shouldHaveNotionData: true },
  { name: 'Find word', icon: BiFileFind, href: ERoutes.FIND_WORD, shouldHaveNotionData: false },
  { name: 'Add word', icon: BiAddToQueue, href: ERoutes.ADD_WORD, shouldHaveNotionData: true },
  {
    name: 'Account Settings',
    icon: FiSettings,
    href: ERoutes.ACCOUNT_SETTINGS,
    shouldHaveNotionData: true,
  },
  {
    name: 'Privacy Policy',
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
  {
    name: 'Donate',
    icon: BiDonateHeart,
    href: ERoutes.DONATE,
    shouldHaveNotionData: false,
  },
];