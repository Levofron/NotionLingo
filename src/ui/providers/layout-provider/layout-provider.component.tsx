import { FC } from 'react';

import { SidebarWithHeader } from '@ui/organisms';

import { ILayoutProviderProps } from './layout-provider.types';

export const LayoutProvider: FC<ILayoutProviderProps> = ({ children }): JSX.Element => (
  <SidebarWithHeader>{children}</SidebarWithHeader>
);
