import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

export interface ITinderAnimationWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
  isDraggable: boolean;
  onScreenExit: () => void;
  zIndex: number;
}
