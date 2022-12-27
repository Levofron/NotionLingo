import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from 'react-icons/fi';

import { ISidebarItem } from './sidebar-content.types';

export const sidebarItems: Array<ISidebarItem> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Trending', icon: FiTrendingUp, href: '/' },
  { name: 'Explore', icon: FiCompass, href: '/' },
  { name: 'Favourites', icon: FiStar, href: '/' },
  { name: 'Settings', icon: FiSettings, href: '/' },
];
