import { INotionDatabase } from '@domain/rest/rest.types';

export interface IAvailableNotionDatabaseProps {
  availableNotionDatabase: INotionDatabase;
  isLoading: boolean;
  onClick: (notionDatabaseId: string) => void;
}
