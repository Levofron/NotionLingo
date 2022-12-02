export interface IUser {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  updatedAt: string | null;
}

export interface IHash {
  content: string;
  iv: string;
}
