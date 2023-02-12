export interface ILocalStorageApi {
  getItem: (key: string) => string | null;
  isSupported: () => boolean;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
}
