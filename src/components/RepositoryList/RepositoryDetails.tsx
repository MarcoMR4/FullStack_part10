import Text from "@/src/components/Text";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { GET_REPOSITORY_DETAILS } from "@/src/graphql/queries";
import { getTheme } from "@/src/theme";
import { overThousandFormatter } from "@/src/utils/quantitiesFormatters";
import { useQuery } from "@apollo/client/react";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import RepositoryReviews from "./RepositoryReviews";

// Componente para mostrar cada estadística
const StatsItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) => (
  <View
    style={{
      flexDirection: "column",
      alignItems: "center",
      minWidth: 60,
      paddingVertical: 20,
    }}
  >
    <Text fontWeight="bold" style={{ color, fontSize: 13 }}>
      {label}
    </Text>
    <Text style={{ color, fontSize: 13, marginTop: 2 }}>{value}</Text>
  </View>
);

interface RepositoryDetailsProps {
  repositoryId?: string;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  repositoryId,
}) => {
  const id = repositoryId;

  const { themeScheme } = useThemeScheme();

  const theme = getTheme(themeScheme);

  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { repositoryId: id },
  });

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, marginTop: 40 }}
        color={theme.colors.primary}
      />
    );
  }
  if (error) {
    return (
      <Text style={{ color: theme.colors.error, margin: 20 }}>
        Error loading repository details
      </Text>
    );
  }
  const repo = (data as any)?.repository;
  if (!repo) return null;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={{
          backgroundColor: theme.colors.background,
          padding: 16,
          borderRadius: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: repo.ownerAvatarUrl }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              marginRight: 16,
              backgroundColor: theme.colors.background,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={{ color: theme.colors.textSecondary, marginBottom: 4 }}
            >
              {repo.fullName}
            </Text>
            <Text style={{ color: theme.colors.textPrimary, marginTop: 4 }}>
              {repo.description}
            </Text>
            <Text style={{ color: theme.colors.primary, marginTop: 4 }}>
              {repo.language}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            gap: 10,
          }}
        >
          <StatsItem
            label="Stars"
            value={overThousandFormatter.format(repo.stargazersCount)}
            color={theme.colors.textPrimary}
          />
          <StatsItem
            label="Forks"
            value={overThousandFormatter.format(repo.forksCount)}
            color={theme.colors.textPrimary}
          />
          <StatsItem
            label="Reviews"
            value={overThousandFormatter.format(repo.reviewCount)}
            color={theme.colors.textPrimary}
          />
          <StatsItem
            label="Rating"
            value={repo.ratingAverage}
            color={theme.colors.textPrimary}
          />
        </View>
        <Button
          title="Open in GitHub"
          onPress={() => Linking.openURL(repo.url)}
          color={theme.colors.primary}
        />
        {repo.reviews?.edges?.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text
              fontWeight="bold"
              style={{
                color: theme.colors.textSecondary,
                marginBottom: 8,
                fontSize: 16,
              }}
            >
              Reviews
            </Text>
            <RepositoryReviews
              reviews={repo.reviews.edges.map((e: any) => e.node)}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
});

export default RepositoryDetails;
