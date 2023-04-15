import { HTMLMotionProps } from 'framer-motion';
import { IconType } from 'react-icons';

export type MotionIconButtonProps = HTMLMotionProps<'button'> & {
  icon: IconType;
  onClick: () => void;
};
