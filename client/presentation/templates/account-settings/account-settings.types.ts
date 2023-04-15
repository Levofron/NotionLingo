import { User } from '@supabase/supabase-js';
import { RefObject } from 'react';

import { ConfirmationModalRef } from '@presentation/molecules';

import { Profile } from '@domain/rest/rest.models';

export interface AccountSettingsProps {
  deleteAccountModalRef: RefObject<ConfirmationModalRef>;
  deleteProfileCountdown: number;
  isDeleteProfileCountdownStarted: boolean;
  isDeleteProfileLoading: boolean;
  isResetIntegrationCountdownStarted: boolean;
  isResetIntegrationLoading: boolean;
  onDeleteProfile: () => void;
  onResetIntegration: () => void;
  resetIntegrationCountdown: number;
  resetIntegrationModalRef: RefObject<ConfirmationModalRef>;
  shouldDisableActionButtons: boolean;
  user: (User & Profile) | null;
}
