import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';

import { localStorageModule, speechSynthesisModule } from '@adapter';

import { Icon } from '@ui/atoms';

import { useCountdown, useKeyPressMapper, useWindowSize } from '@infrastructure/utils';

import { INotionWordCardAnimationWrapperProps } from './notion-word-card-animation-wrapper.types';

export const NotionWordCardAnimationWrapper: FC<INotionWordCardAnimationWrapperProps> = ({
  children,
  isDraggable,
  onScreenExit,
  zIndex,
  ...restProps
}): JSX.Element => {
  const windowSize = useWindowSize();
  const [isRotated, setIsRotated] = useState(false);
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
  const leftLearnedLabelOpacity = useTransform(x, [100, sensitive], [0, 200]);
  const rightLearnedLabelOpacity = useTransform(x, [-100, -sensitive], [0, 200]);

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

  const handleRotateIconClick = () => {
    animControls.start({ rotateY: isRotated ? -90 : 90 }).then(() => {
      setIsRotated((_prevState) => !_prevState);

      animControls.start({ rotateY: 0 });
    });
  };

  useKeyPressMapper(
    [
      {
        key: 'Space',
        callback: handleScreenExit,
      },
      {
        key: 'KeyR',
        callback: handleRotateIconClick,
      },
    ],
    !isDraggable,
  );

  const shouldEnableRotateIcon =
    localStorageModule.isSupported() && speechSynthesisModule.isSupported();

  return (
    <motion.div
      animate={animControls}
      drag={isDraggable && !isRotated}
      exit={{ opacity: 0 }}
      style={{
        x,
        rotate,
        zIndex,
        position: 'absolute',
        pointerEvents: isDraggable ? 'auto' : 'none',
      }}
      whileDrag={{ scale: 1.05 }}
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
      {shouldEnableRotateIcon ? (
        <Icon
          as={isRotated ? GiClockwiseRotation : GiAnticlockwiseRotation}
          cursor="pointer"
          display={isDraggable ? 'block' : 'none'}
          fontSize="5xl"
          position="absolute"
          right="50%"
          style={{ transform: 'translateX(50%)' }}
          top="-60px"
          onClick={handleRotateIconClick}
        />
      ) : null}
      {!isRotated ? (
        <>
          <motion.div style={{ opacity: leftLearnedLabelOpacity }}>
            <Icon
              as={BsCheckCircleFill}
              background="white"
              borderRadius="50%"
              fontSize="5xl"
              left={3}
              p={1}
              position="absolute"
              top={3}
              zIndex={zIndex + 1}
            />
          </motion.div>
          <motion.div style={{ opacity: rightLearnedLabelOpacity }}>
            <Icon
              as={BsCheckCircleFill}
              background="white"
              borderRadius="50%"
              fontSize="5xl"
              p={1}
              position="absolute"
              right={3}
              top={3}
              zIndex={zIndex + 1}
            />
          </motion.div>
        </>
      ) : null}
      {children({ onClick: handleScreenExit, countdown, isCountdownEnded: isEnded, isRotated })}
    </motion.div>
  );
};
