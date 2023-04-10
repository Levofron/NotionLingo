import { TNotionTableColumn } from '@domain/rest/rest.types';

export interface IAddWordProps {
  error: string | null;
  isCreateWordLoading: boolean;
  isTableColumnsLoading: boolean;
  onRefetchButtonClick: () => void;
  onSubmit: (values: Record<string, string>, reset: () => void) => void;
  redirectToHome: () => void;
  tableColumns: TNotionTableColumn[] | null;
}
