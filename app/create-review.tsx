import RepositoryReviewForm from "@/src/components/repositorylist/RepositoryReviewForm";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { getTheme } from "@/src/theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const CreateReviewScreen = () => {
  const { repositoryName, ownerName } = useLocalSearchParams();
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <RepositoryReviewForm
        repositoryName={
          typeof repositoryName === "string" ? repositoryName : undefined
        }
        ownerName={typeof ownerName === "string" ? ownerName : undefined}
        themeScheme={themeScheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
  },
});

export default CreateReviewScreen;
