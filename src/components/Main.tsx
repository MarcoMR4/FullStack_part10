import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";

import RepositoryList from "./repositorylist";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    color: "white",
    padding: 1,
    gap: 15,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

export default Main;
