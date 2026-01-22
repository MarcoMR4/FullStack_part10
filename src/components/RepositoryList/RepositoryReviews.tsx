import Text from "@/src/components/Text";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { getTheme } from "@/src/theme";
import formatDate from "@/src/utils/dateFormats";
import React from "react";
import { Text as RNText, StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

const ReviewItem = ({ review }: { review: any }) => {
  const { themeScheme } = useThemeScheme();
  const currentTheme = getTheme(themeScheme);
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.row}>
        <View
          style={[
            styles.circle,
            {
              borderColor: currentTheme.colors.textSecondary,
              borderRadius: styles.circle.width / 2,
            },
          ]}
        >
          <RNText
            style={{
              color: currentTheme.colors.textSecondary,
              fontWeight: "bold",
            }}
          >
            {review.rating}
          </RNText>
        </View>
        <View style={styles.userColumn}>
          <Text
            fontWeight="bold"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            {review.user?.username}
          </Text>
          <Text style={{ color: currentTheme.colors.date, fontSize: 12 }}>
            {formatDate(review.createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.textRow}>
        <Text style={{ color: currentTheme.colors.textPrimary, fontSize: 14 }}>
          {review.text}
        </Text>
      </View>
    </View>
  );
};

interface RepositoryReviewsProps {
  reviews: any[];
  onEndReached?: () => void;
  hasNextPage?: boolean;
  loading?: boolean;
}

const RepositoryReviews: React.FC<RepositoryReviewsProps> = ({ reviews, onEndReached, hasNextPage, loading }) => {
  const { themeScheme } = useThemeScheme();
  const currentTheme = getTheme(themeScheme);
  if (!reviews?.length) return null;
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={() => (
        <View style={[styles.separator, { backgroundColor: currentTheme.colors.textSecondary }]} />
      )}
      contentContainerStyle={styles.listContainer}
      onEndReached={() => {
        if (hasNextPage && !loading && onEndReached) onEndReached();
      }}
      onEndReachedThreshold={0.2}
      ListFooterComponent={
        loading && hasNextPage ? (
          <ActivityIndicator style={{ marginVertical: 16 }} color={currentTheme.colors.primary} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  reviewContainer: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userColumn: {
    flexDirection: "column",
    justifyContent: "center",
  },
  textRow: {
    marginTop: 6,
    marginLeft: 48,
  },
  separator: {
    height: 1,
    marginVertical: 8,
    marginLeft: 48,
  },
});

export default RepositoryReviews;
