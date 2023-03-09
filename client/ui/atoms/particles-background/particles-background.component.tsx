import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export const ParticlesBackground = () => (
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
            distance: 250,
            duration: 2,
            size: 0,
            opacity: 0,
          },
          repulse: {
            distance: 400,
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
          value: 160,
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

export default ParticlesBackground;
