import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { FC, useMemo } from 'react';

import { useWindowSize } from '@infrastructure/utils';

import { ITinderAnimationWrapperProps } from './tinder-animation-wrapper.types';

export const TinderAnimationWrapper: FC<ITinderAnimationWrapperProps> = ({
  children,
  isDraggable,
  onScreenExit,
  zIndex,
  ...restProps
}): JSX.Element => {
  const windowSize = useWindowSize();
  const rotateWidth = useMemo(() => Math.max(windowSize.width, 700), [windowSize.width]);

  const x = useMotionValue(0);
  const animControls = useAnimation();
  const rotate = useTransform(x, [-rotateWidth, rotateWidth], [-35, 35]);

  const handleScreenExit = () => {
    animControls.start({ x: rotateWidth }).then(onScreenExit);
  };

  const getSensitive = () => {
    if (windowSize.width < 320) {
      return 175;
    }

    if (windowSize.width < 480) {
      return 250;
    }

    return 300;
  };

  const sensitive = useMemo(getSensitive, [windowSize.width]);

  return (
    <motion.div
      animate={animControls}
      drag={isDraggable}
      exit={{ opacity: 0 }}
      style={{
        x,
        rotate,
        zIndex,
        position: 'absolute',
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) < sensitive) {
          animControls.start({ x: 0, y: 0 });
        } else {
          animControls
            .start({ x: info.offset.x < 0 ? -rotateWidth : rotateWidth })
            .then(onScreenExit);
        }
      }}
      {...restProps}
    >
      {children({ onClick: handleScreenExit })}
    </motion.div>
  );
};
