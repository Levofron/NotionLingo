import { healthCheckUseCase } from '@domain/rest/rest.use-case';
import { getRestRepository } from '@data/repositories/rest.repository';
import { getRestSource } from '@data/sources/rest/rest.source';

import { axiosInstance } from '@infrastructure';

// sources
const restSource = getRestSource(axiosInstance);

// repositories
const restRepository = getRestRepository(restSource);

export const restModule = {
  healthCheck: healthCheckUseCase(restRepository).execute,
};
