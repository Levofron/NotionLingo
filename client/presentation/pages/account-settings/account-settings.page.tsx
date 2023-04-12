import { useRef } from 'react';

import { withCheckIfUserLogged } from '@presentation/hoc';
import { IConfirmationModalRef } from '@presentation/molecules';
import { AccountSettings as AccountSettingsTemplate } from '@presentation/templates';

import { useDeleteProfile, useResetIntegration } from '@adapter/hooks';

import { useCountdown, useRouter, useToast, useUser } from '@shared/hooks';
import { ERoutes } from '@shared/routes';

const AccountSettingsComponent = () => {
  const toast = useToast();
  const { redirectToOnboarding } = useRouter();
  const { logout, setNotionData, user } = useUser();

  const {
    countdown: resetIntegrationCountdown,
    end: endResetIntegrationCountdown,
    isStarted: isResetIntegrationCountdownStarted,
    start: startResetIntegrationCountdown,
  } = useCountdown(5);

  const {
    countdown: deleteProfileCountdown,
    end: endDeleteProfileCountdown,
    isStarted: isDeleteProfileCountdownStarted,
    start: startDeleteProfileCountdown,
  } = useCountdown(5);

  const deleteAccountModalRef = useRef<IConfirmationModalRef>(null);
  const resetIntegrationModalRef = useRef<IConfirmationModalRef>(null);

  const { deleteProfile, isDeleteProfileLoading } = useDeleteProfile();
  const { isResetIntegrationLoading, resetIntegration } = useResetIntegration();

  const handleResetIntegration = () =>
    resetIntegration()
      .then(() => {
        startResetIntegrationCountdown();

        setTimeout(() =>
          toast.success({
            description: 'Integration has been reset!',
            onCloseComplete: () => {
              setNotionData(false);
              redirectToOnboarding();
              endResetIntegrationCountdown();
            },
          }),
        );
      })
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      )
      .finally(resetIntegrationModalRef.current?.close);

  const handleDeleteProfile = () =>
    deleteProfile()
      .then(() => {
        startDeleteProfileCountdown();

        setTimeout(() => {
          toast.success({
            description: 'Account has been deleted!',
            onCloseComplete: () => {
              logout();
              setNotionData(false);
              endDeleteProfileCountdown();
            },
          });
        }, 0);
      })
      .catch((_error) =>
        toast.error({
          description: _error,
        }),
      )
      .finally(deleteAccountModalRef.current?.close);

  const shouldDisableActionButtons =
    isDeleteProfileCountdownStarted || isResetIntegrationCountdownStarted || !user?.hasNotionData;

  return (
    <AccountSettingsTemplate
      deleteAccountModalRef={deleteAccountModalRef}
      deleteProfileCountdown={deleteProfileCountdown}
      isDeleteProfileCountdownStarted={isDeleteProfileCountdownStarted}
      isDeleteProfileLoading={isDeleteProfileLoading}
      isResetIntegrationCountdownStarted={isResetIntegrationCountdownStarted}
      isResetIntegrationLoading={isResetIntegrationLoading}
      resetIntegrationCountdown={resetIntegrationCountdown}
      resetIntegrationModalRef={resetIntegrationModalRef}
      shouldDisableActionButtons={shouldDisableActionButtons}
      user={user}
      onDeleteProfile={handleDeleteProfile}
      onResetIntegration={handleResetIntegration}
    />
  );
};

export const AccountSettings = withCheckIfUserLogged(AccountSettingsComponent, {
  currentPageUrl: ERoutes.ACCOUNT_SETTINGS,
  redirectUrlOnError: ERoutes.ONBOARDING,
  shouldHaveNotionData: true,
});
