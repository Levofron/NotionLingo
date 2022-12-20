export interface IUseCaseWithSingleParamAndPromiseResult<TParam, TResult> {
  execute: (param: TParam) => Promise<TResult>;
}

export interface IUseCaseWithMultipleParamsAndPromiseResult<TParam, TResult> {
  execute: (...params: TParam[]) => Promise<TResult>;
}

export interface IUseCaseWithSingleParam<TParam, TResult> {
  execute: (param: TParam) => TResult;
}

export interface IUseCaseWithMultipleParams<TParam, TResult> {
  execute: (...params: TParam[]) => TResult;
}

export interface IUseCaseWithoutParams<TResult> {
  execute: () => TResult;
}

export interface IUseCaseWithoutParamsAndPromiseResult<TResult> {
  execute: () => Promise<TResult>;
}
