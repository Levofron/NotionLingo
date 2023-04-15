export interface IIncreaseDailyStreak {
  daysInStreak: number | null;
  todayWordsStreak: number | null;
  totalLearnedWords: number | null;
}

export interface IProfile extends IIncreaseDailyStreak {
  avatarUrl: string;
  createdAt: string;
  daysInStreak: number | null;
  email: string;
  fullName: string;
  hasNotionData: boolean;
  todayWordsStreak: number | null;
  totalLearnedWords: number | null;
}
export interface IHash {
  content: string;
  iv: string;
}

export interface INotionWord {
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

export interface INotionDatabase {
  createdTime: string;
  id: string;
  lastEditedTime: string;
  title: string;
  url: string;
}

export interface IContact {
  email: string;
  fullName: string;
  message: string;
}

interface IDictionarySuggestion {
  example: string;
  meaning: string;
}

export interface IDictionarySuggestions {
  suggestions: IDictionarySuggestion[];
  word: string;
}

export interface IUpdatedNotionWord {
  exampleSentence?: string;
  id: string;
  meaning?: string;
}

export interface IUpdateNotionWordRequest {
  updatedNotionWord: IUpdatedNotionWord;
  words: INotionWord[];
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
