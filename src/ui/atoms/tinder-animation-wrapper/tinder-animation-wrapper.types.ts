import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface IChildrenProps {
  countdown: number;
  isCountdownEnded: boolean;
  onClick: () => void;
}

export interface ITinderAnimationWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: (props: IChildrenProps) => ReactNode;
  isDraggable: boolean;
  onScreenExit: () => void;
  zIndex: number;
}
