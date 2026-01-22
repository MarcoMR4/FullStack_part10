export interface User {
  id: string;
  username: string;
  createdAt: string;
  reviewsCount: number;
  reviews?: [];
}

export interface GetMeData {
  me: User | null;
}
