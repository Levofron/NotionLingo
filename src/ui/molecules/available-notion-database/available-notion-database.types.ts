import { INotionDatabase } from '@domain/entities/rest.types';

export interface IAvailableNotionDatabaseProps {
  availableNotionDatabase: INotionDatabase;
  isLoading: boolean;
  onClick: (notionDatabaseId: string) => void;
}
