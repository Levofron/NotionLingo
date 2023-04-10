import { User } from '@supabase/supabase-js';
import { RefObject } from 'react';

import { IConfirmationModalRef } from '@presentation/molecules';

import { IProfile } from '@domain/rest/rest.types';

export interface IAccountSettingsProps {
  deleteAccountModalRef: RefObject<IConfirmationModalRef>;
  deleteProfileCountdown: number;
  isDeleteProfileCountdownStarted: boolean;
  isDeleteProfileLoading: boolean;
  isResetIntegrationCountdownStarted: boolean;
  isResetIntegrationLoading: boolean;
  onDeleteProfile: () => void;
  onResetIntegration: () => void;
  resetIntegrationCountdown: number;
  resetIntegrationModalRef: RefObject<IConfirmationModalRef>;
  shouldDisableActionButtons: boolean;
  user: (User & IProfile) | null;
}
