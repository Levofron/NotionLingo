import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { FC, useCallback, useEffect, useMemo } from 'react';

import { useCountdown, useWindowSize } from '@infrastructure/utils';

import { ITinderAnimationWrapperProps } from './tinder-animation-wrapper.types';

export const TinderAnimationWrapper: FC<ITinderAnimationWrapperProps> = ({
  children,
  isDraggable,
  onScreenExit,
  zIndex,
  ...restProps
}): JSX.Element => {
  const windowSize = useWindowSize();
  const { countdown, isEnded, isStarted, start } = useCountdown(5);
  const rotateWidth = useMemo(() => Math.max(windowSize.width, 700), [windowSize.width]);

  const x = useMotionValue(0);
  const animControls = useAnimation();
  const rotate = useTransform(x, [-rotateWidth, rotateWidth], [-35, 35]);

  useEffect(() => {
    if (isDraggable) {
      start();
    }
  }, [isDraggable]);

  const handleScreenExit = useCallback(() => {
    if (isStarted) {
      return;
    }

    animControls.start({ x: rotateWidth }).then(onScreenExit);
  }, [isStarted]);

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
      whileDrag={{ scale: 1.1 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) < sensitive || isStarted) {
          animControls.start({ x: 0, y: 0 });
        } else {
          animControls
            .start({ x: info.offset.x < 0 ? -rotateWidth : rotateWidth })
            .then(onScreenExit);
        }
      }}
      {...restProps}
    >
      {children({ onClick: handleScreenExit, countdown, isCountdownEnded: isEnded })}
    </motion.div>
  );
};
