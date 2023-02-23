import { useRouter as useNextRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { ERoutes } from '@infrastructure/types/routes';

export const useRouter = () => {
  const router = useNextRouter();

  const isSamePath = useCallback((path: string) => router.pathname === path, [router.pathname]);

  const redirectTo = useCallback(
    (path: string) => !isSamePath(path) && router.push(path),
    [router.push, isSamePath],
  );

  const isHome = useMemo(() => isSamePath(ERoutes.HOME), [isSamePath]);

  const isDonate = useMemo(() => isSamePath(ERoutes.DONATE), [isSamePath]);

  const isDashboard = useMemo(() => isSamePath(ERoutes.DASHBOARD), [isSamePath]);

  const isOnboarding = useMemo(() => isSamePath(ERoutes.ONBOARDING), [isSamePath]);

  const redirectToHome = useCallback(() => redirectTo(ERoutes.HOME), [redirectTo]);

  const redirectToDashboard = useCallback(() => redirectTo(ERoutes.DASHBOARD), [redirectTo]);

  const redirectToOnboarding = useCallback(() => redirectTo(ERoutes.ONBOARDING), [redirectTo]);

  return {
    isHome,
    isDonate,
    isSamePath,
    redirectTo,
    isDashboard,
    isOnboarding,
    redirectToHome,
    back: router.back,
    push: router.push,
    query: router.query,
    redirectToDashboard,
    redirectToOnboarding,
    pathname: router.pathname,
  };
};
