import { useRouter as useNextRouter } from 'next/router';
import { useCallback, useContext, useMemo } from 'react';

import { RouterContext } from '@shared/context';
import { Routes } from '@shared/routes';

export const useRouter = () => {
  const router = useNextRouter();
  const routerContext = useContext(RouterContext);

  const isSamePath = useCallback((path: string) => router.pathname === path, [router.pathname]);

  const redirectTo = useCallback(
    (path: string) => !isSamePath(path) && router.push(path),
    [router.push, isSamePath],
  );

  const redirectWithReplace = useCallback((path: string) => router.replace(path), [router.replace]);

  const isHome = useMemo(() => isSamePath(Routes.HOME), [isSamePath]);

  const isDonate = useMemo(() => isSamePath(Routes.DONATE), [isSamePath]);

  const isDashboard = useMemo(() => isSamePath(Routes.DASHBOARD), [isSamePath]);

  const isOnboarding = useMemo(() => isSamePath(Routes.ONBOARDING), [isSamePath]);

  const redirectToHome = useCallback(() => redirectTo(Routes.HOME), [redirectTo]);

  const redirectToLogin = useCallback(() => redirectTo(Routes.LOGIN), [redirectTo]);

  const redirectToDashboard = useCallback(() => redirectTo(Routes.DASHBOARD), [redirectTo]);

  const redirectToOnboarding = useCallback(() => redirectTo(Routes.ONBOARDING), [redirectTo]);

  const redirectWithReplaceToAddWord = useCallback(
    () => redirectWithReplace(Routes.ADD_WORD),
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
