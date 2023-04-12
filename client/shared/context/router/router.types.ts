export interface IRouterContextValue {
  getCurrentPath: () => string | null;
  getPreviousPath: () => string | null;
}
