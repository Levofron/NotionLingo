export interface IUser {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
}

export interface IHash {
  content: string;
  iv: string;
}

export interface INotionWord {
  exampleSentence: string;
  meaning: string;
  word: string;
}

export interface INotionPage {
  createdTime: string;
  id: string;
  lastEditedTime: string;
  title: string;
  url: string;
}
