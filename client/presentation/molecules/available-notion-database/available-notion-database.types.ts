import { NotionDatabase } from '@domain/rest/rest.models';

export interface AvailableNotionDatabaseProps {
  availableNotionDatabase: NotionDatabase;
  isLoading: boolean;
  onClick: (notionDatabaseId: string) => void;
}
