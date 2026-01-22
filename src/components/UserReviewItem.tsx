import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeScheme } from "../context/ThemeContext";
import { getTheme } from "../theme";
import formatDate from "../utils/dateFormats";
import Text from "./Text";

interface UserReviewItemProps {
  rating: number;
  repositoryName: string;
  createdAt: string;
  text: string;
  onViewRepository?: () => void;
  onDeleteReview?: () => void;
}

const UserReviewItem: React.FC<UserReviewItemProps> = ({
  rating,
  repositoryName,
  createdAt,
  text,
  onViewRepository,
  onDeleteReview,
}) => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.Item.backgroundColor },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[styles.ratingCircle, { borderColor: theme.colors.primary }]}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {rating}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ color: theme.colors.textSecondary }}
          >
            {repositoryName}
          </Text>
          <Text style={{ color: theme.colors.date, marginTop: 2 }}>
            {formatDate(createdAt)}
          </Text>
          <Text style={{ color: theme.colors.textPrimary, marginTop: 8 }}>
            {text}
          </Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary, marginRight: 8 },
          ]}
          onPress={onViewRepository}
          activeOpacity={0.8}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            View repository
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.error }]}
          onPress={onDeleteReview}
          activeOpacity={0.8}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Delete review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    // backgroundColor: theme.Item.backgroundColor, // set dynamically
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
});

export default UserReviewItem;
