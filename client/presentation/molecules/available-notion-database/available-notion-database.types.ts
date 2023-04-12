import { INotionDatabase } from '@domain/rest/rest.models';

export interface IAvailableNotionDatabaseProps {
  availableNotionDatabase: INotionDatabase;
  isLoading: boolean;
  onClick: (notionDatabaseId: string) => void;
}
