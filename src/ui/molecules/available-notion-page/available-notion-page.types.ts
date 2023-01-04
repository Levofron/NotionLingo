import { INotionPage } from '@domain/rest/rest.models';

export interface IAvailableNotionPageProps {
  availableNotionPage: INotionPage;
  isLoading: boolean;
  onClick: (notionPageId: string) => void;
}
