interface FilterToQuery {
  latest: {
    orderBy: string;
    orderDirection: string;
  };
  highest: {
    orderBy: string;
    orderDirection: string;
  };
  lowest: {
    orderBy: string;
    orderDirection: string;
  };
}

interface RepositoryListFilterProps {
  filter: keyof FilterToQuery;
  onFilterChange: (value: keyof FilterToQuery) => void;
}
export type { FilterToQuery, RepositoryListFilterProps };

