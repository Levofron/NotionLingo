import { Hide as ChakraHide } from '@chakra-ui/react';
import { FC } from 'react';

import { IHideProps } from './hide.types';

export const Hide: FC<IHideProps> = (props): JSX.Element => <ChakraHide {...props} />;
