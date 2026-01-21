import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GET_REPOSITORIES } from "../../graphql/queries";
import { FilterToQuery } from "../../types/repositoryListFilters";
import { RepositoryEdge } from "../../types/respository";
import Text from "../Text";
import RepositoryListContainer from "./RepositoryListContainer";
import RepositoryListFilter from "./RepositoryListFilter";
import SearchKeywordFilter from "./SearchKeywordFilter";

import { useThemeScheme } from "../../context/ThemeContext";
import { getTheme } from "../../theme";
import RepositoryDetails from "./RepositoryDetails";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const router = useRouter();
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

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

  if (selectedId) {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: theme.colors.background,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedId(null)}
          style={{
            padding: 10,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white" }}>Return to List</Text>
        </TouchableOpacity>
        <RepositoryDetails repositoryId={selectedId} />
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, padding: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ marginBottom: 10 }}>
        <SearchKeywordFilter keyword={keyword} onKeywordChange={setKeyword} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <RepositoryListFilter filter={filter} onFilterChange={setFilter} />
      </View>
      <View style={{ flex: 1 }}>
        <RepositoryListContainer
          repositories={repositories}
          onSelectRepository={setSelectedId}
        />
      </View>
    </View>
  );
};

export default RepositoryList;
