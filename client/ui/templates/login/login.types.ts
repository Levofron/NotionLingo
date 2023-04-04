export interface ILoginProps {
  isLoading: boolean;
  onSubmit: (values: Record<string, string>, reset: () => void) => void;
}
