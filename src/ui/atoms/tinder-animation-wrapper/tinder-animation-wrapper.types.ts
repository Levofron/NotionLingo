import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface IChildrenProps {
  onClick: () => void;
}

export interface ITinderAnimationWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ({ onClick }: IChildrenProps) => ReactNode;
  isDraggable: boolean;
  onScreenExit: () => void;
  zIndex: number;
}
