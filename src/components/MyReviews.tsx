import { useMutation, useQuery } from "@apollo/client/react";
import React from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    View,
} from "react-native";
import { useThemeScheme } from "../context/ThemeContext";
import { GET_ME } from "../graphql/queries";
import { getTheme } from "../theme";
import Text from "./Text";
import UserReviewItem from "./UserReviewItem";

import { useRouter } from "expo-router";
import { DELETE_REVIEW } from "../graphql/mutations";

const MyReviews: React.FC = () => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { includeReviews: true, first: 5 },
    fetchPolicy: "cache-and-network",
  });

  const router = useRouter();
  const [deleteReviewMutation, { loading: deleteLoading }] =
    useMutation(DELETE_REVIEW);

  const deleteReview = async (id: string) => {
    try {
      const { data } = await deleteReviewMutation({
        variables: { deleteReviewId: id },
        refetchQueries: [
          { query: GET_ME, variables: { includeReviews: true, first: 5 } },
        ],
      });
      if (data && (data as any).deleteReview) {
        router.replace("/reviews");
      }
    } catch (e) {
      console.log("Error deleting review:", e);
    }
  };

  if (loading || deleteLoading) {
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
          onViewRepository={() => {
            if (item.repository?.url) {
              Linking.openURL(item.repository.url);
            }
          }}
          onDeleteReview={() => {
            Alert.alert(
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    deleteReview(item.id);
                  },
                },
              ],
            );
          }}
        />
      )}
    />
  );
};

export default MyReviews;
