import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ChildrenProps {
  countdown: number;
  isCountdownEnded: boolean;
  isRotated: boolean;
  isTopCard: boolean;
  onClick: () => void;
}

export interface NotionWordCardAnimationWrapperProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: (props: ChildrenProps) => ReactNode;
  isDraggable: boolean;
  onScreenExit: () => void;
  zIndex: number;
}
