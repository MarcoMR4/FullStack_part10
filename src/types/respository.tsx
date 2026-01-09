
interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

interface RepositoryEdge {
  node: Repository;
}

interface Repositories {
  edges: RepositoryEdge[];
}

export type { Repository, RepositoryEdge, Repositories };

