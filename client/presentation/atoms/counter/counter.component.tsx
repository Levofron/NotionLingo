import { animate } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';

import { CounterProps } from './counter.types';

export const Counter: FC<CounterProps> = ({
  duration = 5,
  from,
  precision = 2,
  to,
}): JSX.Element => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        if (!node) {
          return;
        }

        node.textContent = value.toFixed(precision);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};
