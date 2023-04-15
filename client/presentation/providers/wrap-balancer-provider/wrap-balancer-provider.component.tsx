import { FC } from 'react';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { WrapBalancerProviderProps } from './wrap-balancer-provider.types';

export const WrapBalancerProvider: FC<WrapBalancerProviderProps> = ({ children }): JSX.Element => (
  <BalancerProvider>{children}</BalancerProvider>
);
