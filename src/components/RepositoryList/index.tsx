import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GET_REPOSITORIES } from "../../graphql/queries";
import { FilterToQuery } from "../../types/repositoryListFilters";
import { RepositoryEdge } from "../../types/respository";
import Text from "../Text";
import RepositoryListContainer from "./RepositoryListContainer";
import RepositoryListFilter from "./RepositoryListFilter";
import SearchKeywordFilter from "./SearchKeywordFilter";

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

const RepositoryList = () => {
  const [filter, setFilter] = useState<keyof FilterToQuery>("latest");
  const [keyword, setKeyword] = useState<string>("");
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

  const { data, loading, error, refetch }: any = useQuery<GetRepositoriesData>(
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

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Error loading repositories</Text>
        <Text>{error.message}</Text>
        {error.networkError ? (
          <Text>NetworkError: {String(error.networkError)}</Text>
        ) : null}
        {error.graphQLErrors?.length ? (
          <Text>
            GraphQLErrors:{" "}
            {error.graphQLErrors.map((e: any) => e.message).join(" | ")}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 1 }}>
      <View style={{ marginBottom: 10 }}>
        <SearchKeywordFilter keyword={keyword} onKeywordChange={setKeyword} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <RepositoryListFilter filter={filter} onFilterChange={setFilter} />
      </View>
      <View style={{ flex: 1 }}>
        <RepositoryListContainer repositories={repositories} />
      </View>
    </View>
  );
};

export default RepositoryList;
