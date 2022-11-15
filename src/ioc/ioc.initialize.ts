import { authorizationModule } from './modules/authorization.module';
import { uiSymbols } from '@ui/ui.symbols';
import { Container } from 'inversify';

export const appContainer = new Container({
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
});

export const initializeApplication = () => {
  appContainer.load(authorizationModule);

  const ui = appContainer.get<() => void>(uiSymbols.UI);

  ui();
};
