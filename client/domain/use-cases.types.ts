export interface UseCaseWithSingleParamAndPromiseResult<TParam, TResult> {
  execute: (param: TParam) => Promise<TResult>;
}

export interface UseCaseWithMultipleParamsAndPromiseResult<TParam, TResult> {
  execute: (...params: TParam[]) => Promise<TResult>;
}

export interface UseCaseWithSingleParam<TParam, TResult> {
  execute: (param: TParam) => TResult;
}

export interface UseCaseWithMultipleParams<TParam, TResult> {
  execute: (...params: TParam[]) => TResult;
}

export interface UseCaseWithoutParams<TResult> {
  execute: () => TResult;
}

export interface UseCaseWithoutParamsAndPromiseResult<TResult> {
  execute: () => Promise<TResult>;
}
