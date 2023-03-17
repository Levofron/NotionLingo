export const scrollToTop = (element: HTMLElement | null, behavior: 'auto' | 'smooth' = 'auto') => {
  if (!element) {
    return;
  }

  element.scrollTo({
    top: 0,
    behavior,
  });
};
