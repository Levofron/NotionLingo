import { renderHook } from '@testing-library/react-hooks';

import { useRouter } from './use-router.hook';

const useNextRouter = jest.spyOn(require('next/router'), 'useRouter');

useNextRouter.mockImplementation(() => ({
  pathname: '/',
}));

const mockGetCurrentPath = jest.fn();
const mockGetPreviousPath = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('@shared/context', () => ({
  RouterContext: {
    getCurrentPath: mockGetCurrentPath,
    getPreviousPath: mockGetPreviousPath,
  },
}));

describe('useRouter hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the expected properties', () => {
    const { result } = renderHook(() => useRouter());

    expect(result.current).toEqual(
      expect.objectContaining({
        pathname: '/',
        back: undefined,
        push: undefined,
        query: undefined,
        getCurrentPath: undefined,
        getPreviousPath: undefined,
        isHome: expect.any(Boolean),
        isDonate: expect.any(Boolean),
        isSamePath: expect.any(Function),
        redirectTo: expect.any(Function),
        isDashboard: expect.any(Boolean),
        isOnboarding: expect.any(Boolean),
        redirectToHome: expect.any(Function),
        redirectToLogin: expect.any(Function),
        redirectToDashboard: expect.any(Function),
        redirectToOnboarding: expect.any(Function),
        redirectWithReplaceToAddWord: expect.any(Function),
      }),
    );
  });

  it('should call router.push when redirectTo is called with a different path', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/current-path',
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectTo('/new-path');

    expect(push).toHaveBeenCalledWith('/new-path');
  });

  it('should not call router.push when redirectTo is called with the same path', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/current-path',
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectTo('/current-path');

    expect(push).not.toHaveBeenCalled();
  });

  it('should return true from isHome when the current path is the home page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isHome).toBe(true);
  });

  it('should return false from isHome when the current path is not the home page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/dashboard',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isHome).toBe(false);
  });
  it('should return true from isDashboard when the current path is the dashboard page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/dashboard',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isDashboard).toBe(true);
  });

  it('should return false from isDashboard when the current path is not the dashboard page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/home',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isDashboard).toBe(false);
  });

  it('should return true from isOnboarding when the current path is the onboarding page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/onboarding',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isOnboarding).toBe(true);
  });

  it('should return false from isOnboarding when the current path is not the onboarding page', () => {
    (useNextRouter as jest.Mock).mockReturnValue({
      pathname: '/dashboard',
    });

    const { result } = renderHook(() => useRouter());

    expect(result.current.isOnboarding).toBe(false);
  });

  it('should call router.push when redirectToHome is called', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectToHome();

    expect(push).toHaveBeenCalledWith('/');
  });

  it('should call router.push when redirectToLogin is called', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectToLogin();

    expect(push).toHaveBeenCalledWith('/login');
  });

  it('should call router.push when redirectToDashboard is called', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectToDashboard();

    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('should call router.push when redirectToOnboarding is called', () => {
    const push = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      push,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectToOnboarding();

    expect(push).toHaveBeenCalledWith('/onboarding');
  });

  it('should call router.replace when redirectWithReplaceToAddWord is called', () => {
    const replace = jest.fn();

    (useNextRouter as jest.Mock).mockReturnValue({
      replace,
    });

    const { result } = renderHook(() => useRouter());

    result.current.redirectWithReplaceToAddWord();

    expect(replace).toHaveBeenCalledWith('/add-word');
  });
});
