import { useMediaQuery } from '@chakra-ui/react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export const ParticlesBackground = () => {
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px)');

  const getBubbleNumber = () => {
    if (isSmallerThan600) {
      return 40;
    }

    if (isSmallerThan1024) {
      return 80;
    }

    return 160;
  };

  const getBubbleDistance = () => {
    if (isSmallerThan600) {
      return 50;
    }

    if (isSmallerThan1024) {
      return 120;
    }

    return 200;
  };

  const getBubbleRepulseDistance = () => {
    if (isSmallerThan600) {
      return 100;
    }

    if (isSmallerThan1024) {
      return 200;
    }

    return 300;
  };

  return (
    <Particles
      id="tsparticles"
      init={loadFull}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'bubble',
            },
          },
          modes: {
            bubble: {
              distance: getBubbleDistance(),
              duration: 2,
              size: 0,
              opacity: 0,
            },
            repulse: {
              distance: getBubbleRepulseDistance(),
              duration: 4,
            },
          },
          retina_detect: true,
        },
        particles: {
          color: {
            value: '#000',
          },
          number: {
            value: getBubbleNumber(),
            density: {
              enable: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              speed: 4,
              size_min: 0.3,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            random: true,
            speed: 1,
            direction: 'top',
            out_mode: 'out',
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
      }}
    />
  );
};
