import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";
import { FilterToQuery } from "../types/repositoryListFilters";
import { RepositoryEdge } from "../types/respository";

interface GetRepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
  };
}

const FILTER_TO_QUERY: FilterToQuery = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

export default function useRepositories() {
  const [filter, setFilter] = useState<keyof FilterToQuery>("latest");
  const [keyword, setKeyword] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const router = useRouter();

  const repositoryQueryVars =
    filter && FILTER_TO_QUERY[filter as keyof FilterToQuery]
      ? {
          orderBy: FILTER_TO_QUERY[filter as keyof FilterToQuery].orderBy,
          orderDirection:
            FILTER_TO_QUERY[filter as keyof FilterToQuery].orderDirection,
          searchKeyword: keyword.trim() !== "" ? keyword : "",
        }
      : {};

  const { data, loading, error, refetch } = useQuery<GetRepositoriesData>(
    GET_REPOSITORIES,
    {
      variables: repositoryQueryVars,
    },
  );

  useEffect(() => {
    if (error) {
      console.error("GET_REPOSITORIES error:", JSON.stringify(error, null, 2));
    }
  }, [error]);

  useEffect(() => {
    if (params?.refetch === "1") {
      refetch?.();
      router.replace("/");
    }
  }, [params?.refetch, refetch, router]);

  const repositories = data?.repositories ?? { edges: [] };

  return {
    repositories,
    loading,
    error,
    filter,
    setFilter,
    keyword,
    setKeyword,
    selectedId,
    setSelectedId,
    refetch,
  };
}
