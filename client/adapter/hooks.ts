import { restModule } from '@adapter/modules';

import { useAxios } from '@infrastructure/utils';

export const useUpdateWord = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.updateNotionWord);

  return {
    updateWord: mutateAsync,
    isUpdateWordLoading: isLoading,
  };
};

export const useTableColumns = () => {
  const { data, error, isLoading, mutate, reset } = useAxios(restModule.getNotionTableColumns);

  return {
    tableColumns: data,
    getTableColumns: mutate,
    tableColumnsError: error,
    resetTableColumns: reset,
    isTableColumnsLoading: isLoading,
  };
};

export const useSetDatabaseId = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.setNotionDatabaseId);

  return {
    setDatabaseId: mutateAsync,
    isSetDatabaseIdLoading: isLoading,
  };
};

export const useSetApiToken = () => {
  const { data, error, isLoading, mutateAsync } = useAxios(restModule.setNotionApiToken);

  return {
    hasApiTokenData: !!data,
    setApiTokenError: error,
    setApiToken: mutateAsync,
    isSetApiTokenLoading: isLoading,
  };
};

export const useSendContactFormData = () => {
  const { isLoading, mutateAsync, reset } = useAxios(restModule.sendContactFormData);

  return {
    resetSendContactFormData: reset,
    sendContactFormData: mutateAsync,
    isSendContactFormDataLoading: isLoading,
  };
};

export const useRandomWords = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.getRandomNotionWords);

  return {
    getRandomWords: mutateAsync,
    isRandomWordsLoading: isLoading,
  };
};

export const useDatabases = () => {
  const { data, isLoading, mutate } = useAxios(restModule.getAvailableNotionDatabases);

  return {
    databases: data,
    getDatabases: mutate,
    isDatabasesLoading: isLoading,
  };
};

export const useIncreaseStreak = () => {
  const { mutateAsync } = useAxios(restModule.increaseDailyStreak);

  return {
    increaseStreak: mutateAsync,
  };
};

export const useHealthCheck = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.healthCheck);

  return {
    healthCheck: mutateAsync,
    isHealthCheckLoading: isLoading,
  };
};

export const useDictionarySuggestions = () => {
  const { data, error, isLoading, mutate } = useAxios(restModule.getDictionarySuggestions);

  return {
    dictionarySuggestions: data,
    getDictionarySuggestions: mutate,
    dictionarySuggestionsError: error,
    isGetDictionarySuggestionsLoading: isLoading,
  };
};

export const useDeleteProfile = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.deleteProfile);

  return {
    deleteProfile: mutateAsync,
    isDeleteProfileLoading: isLoading,
  };
};

export const useCreateWord = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.createNotionWord);

  return {
    createWord: mutateAsync,
    isCreateWordLoading: isLoading,
  };
};

export const useResetIntegration = () => {
  const { isLoading, mutateAsync } = useAxios(restModule.resetNotionIntegration);

  return {
    resetIntegration: mutateAsync,
    isResetIntegrationLoading: isLoading,
  };
};

export const useLoggedProfile = () => {
  const { mutateAsync } = useAxios(restModule.getLoggedProfile);

  return {
    getLoggedProfile: mutateAsync,
  };
};

export const useSetSupabaseCookie = () => {
  const { mutateAsync } = useAxios(restModule.setSupabaseCookie);

  return {
    setSupabaseCookie: mutateAsync,
  };
};
