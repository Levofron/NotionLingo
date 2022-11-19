import { IRestRepository } from '@domain/rest/rest.repository';
import { IRestSource } from '../sources/rest/rest.types';

export const getRestRepository = (restSource: IRestSource): IRestRepository => ({
  healthCheck: () => restSource.healthCheck(),
});
