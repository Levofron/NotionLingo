import { IconType } from 'react-icons';

export interface IDisplayErrorProps {
  errorMessage: string | null;
  icon: IconType;
  isLoading?: boolean;
  onRedirectToHomeButtonClick: () => void;
  onRefetchButtonClick?: () => void;
  title: string;
}
