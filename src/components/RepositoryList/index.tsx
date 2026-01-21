import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useThemeScheme } from "../../context/ThemeContext";
import useRepositories from "../../hooks/useRepositories";
import { getTheme } from "../../theme";
import Text from "../Text";
import RepositoryDetails from "./RepositoryDetails";
import RepositoryListContainer from "./RepositoryListContainer";
import RepositoryListFilter from "./RepositoryListFilter";
import SearchKeywordFilter from "./SearchKeywordFilter";

const RepositoryList = () => {
  const {
    repositories,
    loading,
    error,
    filter,
    setFilter,
    keyword,
    setKeyword,
    selectedId,
    setSelectedId,
  } = useRepositories();

  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

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
        {(error as any).networkError ? (
          <Text>NetworkError: {String((error as any).networkError)}</Text>
        ) : null}
        {(error as any).graphQLErrors?.length ? (
          <Text>
            GraphQLErrors:{" "}
            {(error as any).graphQLErrors
              .map((e: any) => e.message)
              .join(" | ")}
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
