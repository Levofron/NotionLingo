import { Show as ChakraShow } from '@chakra-ui/react';
import { FC } from 'react';

import { IShowProps } from './show.types';

export const Show: FC<IShowProps> = (props): JSX.Element => <ChakraShow {...props} />;
