import { ContainerModule } from 'inversify';
import {
  TLoginViaGoogleUseCase,
  loginViaGoogleUseCase,
  TLogoutUseCase,
  logoutUseCase,
} from '@domain/authorization/authorization.use-case';
import { domainSymbols } from '@domain/domain.symbols';
import { injectDependencies } from '../utils';
import { getAuthorizationRepository } from '@data/authorization/authorization.repository';
import { IAuthorizationRepository } from '@domain/authorization/authorization.repository';
import { dataSymbols } from '@data/data.symbols';
import { getSupabaseSource } from '@data/sources';
import { TSupabaseClient } from '@domain/authorization/authorization.types';

export const authorizationModule = new ContainerModule((bind) => {
  bind<TSupabaseClient>(dataSymbols.SupabaseSource).toDynamicValue(
    injectDependencies(getSupabaseSource),
  );

  bind<IAuthorizationRepository>(dataSymbols.AuthorizationRepository).toDynamicValue(
    injectDependencies(getAuthorizationRepository, [dataSymbols.SupabaseSource]),
  );

  bind<TLoginViaGoogleUseCase>(domainSymbols.LoginViaGoogleUseCase).toDynamicValue(
    injectDependencies(loginViaGoogleUseCase, [dataSymbols.AuthorizationRepository]),
  );

  bind<TLogoutUseCase>(domainSymbols.LogoutUseCase).toDynamicValue(
    injectDependencies(logoutUseCase, [dataSymbols.AuthorizationRepository]),
  );
});
