import React from "react";
import { Image, View } from "react-native";

import { Repository } from "../../types/respository";
import { overThousandFormatter } from "../../utils/quantitiesFormatters";
import Text from "../Text";

import { useThemeScheme } from "../../context/ThemeContext";
import { getTheme } from "../../theme";

const RepositoryItem = ({ item }: { item: Repository }) => {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

  return (
    <View
      style={{
        backgroundColor: theme.Item.backgroundColor,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ color: theme.colors.textSecondary, marginBottom: 4 }}
          >
            {item.fullName}
          </Text>
          <Text style={{ color: theme.colors.textPrimary, marginTop: 4 }}>
            {item.description}
          </Text>
          <Text style={{ color: theme.colors.primary, marginTop: 4 }}>
            {item.language}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ color: theme.colors.textPrimary }}>
          Stars: {overThousandFormatter.format(item.stargazersCount)}
        </Text>
        <Text style={{ color: theme.colors.textPrimary }}>
          Forks: {overThousandFormatter.format(item.forksCount)}
        </Text>
        <Text style={{ color: theme.colors.textPrimary }}>
          Reviews: {overThousandFormatter.format(item.reviewCount)}
        </Text>
        <Text style={{ color: theme.colors.textPrimary }}>
          Rating: {item.ratingAverage}
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
