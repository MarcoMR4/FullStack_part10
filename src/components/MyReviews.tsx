import { useQuery } from "@apollo/client/react";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useThemeScheme } from "../context/ThemeContext";
import { GET_ME } from "../graphql/queries";
import { getTheme } from "../theme";
import Text from "./Text";
import UserReviewItem from "./UserReviewItem";

const MyReviews: React.FC = () => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { reviews: true, first: 20 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 40 }}
        color={theme.colors.primary}
      />
    );
  }
  if (error) {
    return (
      <Text style={{ color: theme.colors.error, margin: 20 }}>
        Error loading your reviews
      </Text>
    );
  }

  const reviews =
    (data as any)?.me?.reviews?.edges?.map((edge: any) => edge.node) || [];

  if (!reviews.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 18 }}>
          You have not written any reviews yet.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <UserReviewItem
          rating={item.rating}
          repositoryName={item.repository?.name || ""}
          createdAt={item.createdAt}
          text={item.text}
          onViewRepository={() => {}}
          onDeleteReview={() => {}}
        />
      )}
    />
  );
};

export default MyReviews;
