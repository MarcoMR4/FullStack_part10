import Text from "@/src/components/Text";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { getTheme } from "@/src/theme";
import formatDate from "@/src/utils/dateFormats";
import React from "react";
import { Text as RNText, StyleSheet, View } from "react-native";

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

const RepositoryReviews = ({ reviews }: { reviews: any[] }) => {
  const { themeScheme } = useThemeScheme();
  const currentTheme = getTheme(themeScheme);
  if (!reviews?.length) return null;
  return (
    <View style={styles.listContainer}>
      {reviews.map((review, idx) => (
        <React.Fragment key={review.id}>
          <ReviewItem review={review} />
          {idx < reviews.length - 1 && (
            <View
              style={[
                styles.separator,
                { backgroundColor: currentTheme.colors.textSecondary },
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
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
