import { interfaces } from 'inversify';

export const injectDependencies =
  (func: Function, dependencies: interfaces.ServiceIdentifier<unknown>[] = []) =>
  ({ container }: interfaces.Context) => {
    const injections = dependencies.map((dependency) => container.get(dependency));

    return func.apply(func, injections);
  };
