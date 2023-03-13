import { HTMLMotionProps } from 'framer-motion';
import { IconType } from 'react-icons';

export type TMotionIconButtonProps = HTMLMotionProps<'button'> & {
  icon: IconType;
  onClick: () => void;
};
