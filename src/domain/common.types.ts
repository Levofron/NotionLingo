export interface IUseCase<P, T> {
  execute: (...params: P[]) => Promise<T>;
}
