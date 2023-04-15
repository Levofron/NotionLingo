export interface RouterContextValue {
  getCurrentPath: () => string | null;
  getPreviousPath: () => string | null;
}
