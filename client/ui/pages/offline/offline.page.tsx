import { Offline as OfflineTemplate } from '@ui/templates';

import { useHealthCheck } from '@adapter/hooks';

import { useRouter, useToast } from '@infrastructure/hooks';

export const Offline = () => {
  const toast = useToast();
  const { redirectToHome } = useRouter();
  const { healthCheck, isHealthCheckLoading } = useHealthCheck();

  const handleRedirectToHome = () =>
    healthCheck()
      .then(redirectToHome)
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      );

  return (
    <OfflineTemplate isLoading={isHealthCheckLoading} onRedirectToHome={handleRedirectToHome} />
  );
};
