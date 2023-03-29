import { functionImportTest } from '@infrastructure/jest';

import { scrollToTop } from './scroll-to-top.function';

describe('scrollToTop function', () => {
  functionImportTest(scrollToTop);

  it('should rerutn undefined if element is null', () => {
    expect(scrollToTop(null)).toBeUndefined();
  });

  it('should call scrollTo method on element', () => {
    const element = {
      scrollTo: jest.fn(),
    };

    // @ts-expect-error
    scrollToTop(element);

    expect(element.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });

  it('should call scrollTo method on element with smooth behavior', () => {
    const element = {
      scrollTo: jest.fn(),
    };

    // @ts-expect-error
    scrollToTop(element, 'smooth');

    expect(element.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
