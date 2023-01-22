import { FC } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { IWrapBalancerProviderProps } from './wrap-balancer-provider.types';

export const WrapBalancerProvider: FC<IWrapBalancerProviderProps> = ({ children }): JSX.Element => (
  <BalancerProvider>{children}</BalancerProvider>
);
