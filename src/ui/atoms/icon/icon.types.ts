import { As, IconProps } from '@chakra-ui/react';

export interface IIconProps extends IconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: As<any>;
}
