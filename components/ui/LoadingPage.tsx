import { isLoading } from "expo-font";
import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

const LoadingPage = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="##75A815" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: 0,
  },
});

export default LoadingPage;
