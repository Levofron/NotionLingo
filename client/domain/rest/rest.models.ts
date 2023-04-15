export interface IncreaseDailyStreak {
  daysInStreak: number | null;
  todayWordsStreak: number | null;
  totalLearnedWords: number | null;
}

export interface Profile extends IncreaseDailyStreak {
  avatarUrl: string;
  createdAt: string;
  daysInStreak: number | null;
  email: string;
  fullName: string;
  hasNotionData: boolean;
  todayWordsStreak: number | null;
  totalLearnedWords: number | null;
}
export interface Hash {
  content: string;
  iv: string;
}

export interface NotionWord {
  exampleSentence: string;
  exampleSentenceSuggestion?: string;
  id: string;
  imageUrl: string;
  ipa: string | null;
  meaning: string;
  meaningSuggestion?: string;
  type: string | string[] | null;
  word: string;
}

export interface NotionDatabase {
  createdTime: string;
  id: string;
  lastEditedTime: string;
  title: string;
  url: string;
}

export interface Contact {
  email: string;
  fullName: string;
  message: string;
}

interface DictionarySuggestion {
  example: string;
  meaning: string;
}

export interface DictionarySuggestions {
  suggestions: DictionarySuggestion[];
  word: string;
}

export interface UpdatedNotionWord {
  exampleSentence?: string;
  id: string;
  meaning?: string;
}

export interface UpdateNotionWordRequest {
  updatedNotionWord: UpdatedNotionWord;
  words: NotionWord[];
}

export type NotionTableColumn =
  | {
      columnName: string;
      isExampleSentence: boolean;
      isMeaning: boolean;
      isWord: boolean;
      position: number;
      type: 'title' | 'rich_text';
    }
  | {
      columnName: string;
      options: string[];
      position: number;
      type: 'multi_select';
    };
