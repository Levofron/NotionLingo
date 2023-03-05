import { motion } from 'framer-motion';
import { FC } from 'react';

import { Icon } from '@ui/atoms';

import { TMotionIconButtonProps } from './motion-icon-button.types';

export const MotionIconButton: FC<TMotionIconButtonProps> = ({
  icon,
  onClick,
  ...motionButtonProps
}): JSX.Element => (
  <motion.button
    animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 1 }}
    {...motionButtonProps}
  >
    <Icon
      as={icon}
      bg="gray.50"
      borderRadius="999px"
      cursor="pointer"
      fontSize={{ base: '5xl', md: '6xl' }}
      p={1}
      onClick={onClick}
    />
  </motion.button>
);

export default MotionIconButton;
