import { useRouter as useNextRouter } from 'next/router';
import { useCallback, useContext, useMemo } from 'react';

import { RouterContext } from '@infrastructure/context';
import { ERoutes } from '@infrastructure/routes';

export const useRouter = () => {
  const router = useNextRouter();
  const routerContext = useContext(RouterContext);

  const isSamePath = useCallback((path: string) => router.pathname === path, [router.pathname]);

  const redirectTo = useCallback(
    (path: string) => !isSamePath(path) && router.push(path),
    [router.push, isSamePath],
  );

  const redirectWithReplace = useCallback((path: string) => router.replace(path), [router.replace]);

  const isHome = useMemo(() => isSamePath(ERoutes.HOME), [isSamePath]);

  const isDonate = useMemo(() => isSamePath(ERoutes.DONATE), [isSamePath]);

  const isDashboard = useMemo(() => isSamePath(ERoutes.DASHBOARD), [isSamePath]);

  const isOnboarding = useMemo(() => isSamePath(ERoutes.ONBOARDING), [isSamePath]);

  const redirectToHome = useCallback(() => redirectTo(ERoutes.HOME), [redirectTo]);

  const redirectToLogin = useCallback(() => redirectTo(ERoutes.LOGIN), [redirectTo]);

  const redirectToDashboard = useCallback(() => redirectTo(ERoutes.DASHBOARD), [redirectTo]);

  const redirectToOnboarding = useCallback(() => redirectTo(ERoutes.ONBOARDING), [redirectTo]);

  const redirectWithReplaceToAddWord = useCallback(
    () => redirectWithReplace(ERoutes.ADD_WORD),
    [redirectWithReplace],
  );

  return Object.freeze({
    isHome,
    isDonate,
    isSamePath,
    redirectTo,
    isDashboard,
    isOnboarding,
    redirectToHome,
    redirectToLogin,
    back: router.back,
    push: router.push,
    query: router.query,
    redirectToDashboard,
    redirectToOnboarding,
    pathname: router.pathname,
    redirectWithReplaceToAddWord,
    getCurrentPath: routerContext?.getCurrentPath,
    getPreviousPath: routerContext?.getPreviousPath,
  });
};
