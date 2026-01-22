import Text from "@/src/components/Text";
import AuthStorageContext from "@/src/context/AuthStorageContext";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { getTheme } from "@/src/theme";
import { overThousandFormatter } from "@/src/utils/quantitiesFormatters";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  TouchableWithoutFeedback,
  View
} from "react-native";
import useRepositories from "../../hooks/useRepositories";

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
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

  const router = useRouter();
  const authStorage = useContext(AuthStorageContext);
  const [hasToken, setHasToken] = useState(false);

  const { detailsData, detailsLoading, detailsError, setSelectedId } =
    useRepositories();

  // Sincronize selectedId con repositoryId prop
  useEffect(() => {
    if (repositoryId) setSelectedId(repositoryId);
    return () => setSelectedId(null);
  }, [repositoryId, setSelectedId]);

  useEffect(() => {
    const checkToken = async () => {
      if (authStorage) {
        const token = await authStorage.getAccessToken();
        setHasToken(!!token);
      }
    };
    checkToken();
  }, [authStorage]);

  if (detailsLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, marginTop: 40 }}
        color={theme.colors.primary}
      />
    );
  }
  if (detailsError) {
    console.error("Error loading repository details:", detailsError);
    return (
      <Text style={{ color: theme.colors.error, margin: 20 }}>
        Error loading repository details
      </Text>
    );
  }
  const repo = (detailsData as any)?.repository;
  if (!repo) return null;

  return (
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
      {hasToken && (
        <TouchableWithoutFeedback
          onPress={() =>
            router.push({
              pathname: "/create-review",
              params: {
                repositoryName: repo.name,
                ownerName: repo.ownerName,
              },
            })
          }
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 4,
              alignItems: "center",
              paddingVertical: 12,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Create review
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default RepositoryDetails;
