import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface IChildrenProps {
  countdown: number;
  isCountdownEnded: boolean;
  isRotated: boolean;
  isTopCard: boolean;
  onClick: () => void;
}

export interface INotionWordCardAnimationWrapperProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: (props: IChildrenProps) => ReactNode;
  isDraggable: boolean;
  onScreenExit: () => void;
  zIndex: number;
}
