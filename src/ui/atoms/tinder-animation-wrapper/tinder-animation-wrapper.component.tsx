import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import { Icon } from '@ui/atoms';

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

  const x = useMotionValue(0);
  const animControls = useAnimation();
  const rotate = useTransform(x, [-rotateWidth, rotateWidth], [-35, 35]);
  const rightLearnedLabelOpacity = useTransform(x, [50, sensitive], [0, 200]);
  const leftLearnedLabelOpacity = useTransform(x, [-50, -sensitive], [0, 200]);

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
      <motion.div style={{ opacity: rightLearnedLabelOpacity }}>
        <Icon
          as={BsCheckCircleFill}
          background="white"
          borderRadius="50%"
          fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
          left={3}
          p={1}
          position="absolute"
          top={3}
          zIndex={zIndex + 1}
        />
      </motion.div>
      <motion.div style={{ opacity: leftLearnedLabelOpacity }}>
        <Icon
          as={BsCheckCircleFill}
          background="white"
          borderRadius="50%"
          fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
          p={1}
          position="absolute"
          right={3}
          top={3}
          zIndex={zIndex + 1}
        />
      </motion.div>
      {children({ onClick: handleScreenExit, countdown, isCountdownEnded: isEnded })}
    </motion.div>
  );
};
