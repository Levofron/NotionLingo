export interface IIncreaseDailyStreak {
  daysInStreak: number | null;
  todayWordsStreak: number | null;
  totalLearnedWords: number | null;
}

export interface IUser extends IIncreaseDailyStreak {
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
  imageUrl: string;
  ipa: string | null;
  meaning: string;
  type: string | string[] | null;
  word: string;
}

export interface INotionPage {
  createdTime: string;
  id: string;
  lastEditedTime: string;
  title: string;
  url: string;
}

export interface IContact {
  email: string;
  message: string;
  name: string;
}
