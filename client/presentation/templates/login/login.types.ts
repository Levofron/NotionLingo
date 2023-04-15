export interface LoginProps {
  isLoading: boolean;
  onSubmit: (values: Record<string, string>, reset: () => void) => void;
}
