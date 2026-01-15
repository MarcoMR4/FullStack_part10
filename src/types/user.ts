export interface User {
  id: string;
  username: string;
}

export interface GetMeData {
  me: User | null;
}
