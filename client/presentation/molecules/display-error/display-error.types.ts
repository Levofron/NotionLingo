import { IconType } from 'react-icons';

export interface DisplayErrorProps {
  errorMessage: string | null;
  icon: IconType;
  isLoading?: boolean;
  onRedirectToHomeButtonClick: () => void;
  onRefetchButtonClick?: () => void;
  title: string;
}
