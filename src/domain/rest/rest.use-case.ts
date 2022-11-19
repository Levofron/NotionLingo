import { IRestRepository } from './rest.repository';

import { IUseCase } from '../common.types';
import { AxiosResponse } from 'axios';

// healthCheckUseCase
export type THealthCheckUseCase = IUseCase<void, AxiosResponse<string>>;

export const healthCheckUseCase = (restRepository: IRestRepository): THealthCheckUseCase => ({
  execute: (): Promise<AxiosResponse<string>> => restRepository.healthCheck(),
});
