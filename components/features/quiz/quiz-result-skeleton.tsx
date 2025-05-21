import Skeleton from "@/components/ui/skeleton";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const QuizResultSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <Skeleton width={24} height={24} />
        </View>
        <View style={styles.titleContainer}>
          <Skeleton width={180} height={24} />
        </View>
      </View>

      {/* Card container */}
      <View style={styles.card}>
        {/* User info section */}
        <View style={styles.section}>
          <Skeleton width={200} height={24} style={styles.sectionTitle} />
          <View style={styles.userInfo}>
            <Skeleton width={60} height={60} radius={30} />
            <View style={styles.userTextInfo}>
              <Skeleton width={180} height={22} style={styles.userName} />
              <Skeleton width={150} height={18} style={styles.userLogin} />
            </View>
          </View>
        </View>

        {/* Score section */}
        <View style={styles.section}>
          <Skeleton width={120} height={24} style={styles.sectionTitle} />
          <View style={styles.scoreContainer}>
            <Skeleton
              width={120}
              height={120}
              radius={60}
              style={styles.scoreCircle}
            />
          </View>
        </View>

        {/* Summary section */}
        <View style={styles.section}>
          <Skeleton width={100} height={24} style={styles.sectionTitle} />

          <View style={styles.summaryRow}>
            <Skeleton width={120} height={20} />
            <Skeleton width={160} height={20} />
          </View>

          <View style={styles.summaryRow}>
            <Skeleton width={140} height={20} />
            <Skeleton width={120} height={20} />
          </View>

          {/* Stats boxes */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Skeleton width={40} height={30} style={styles.statNumber} />
              <Skeleton width={100} height={20} style={styles.statLabel} />
            </View>
            <View style={styles.statBox}>
              <Skeleton width={40} height={30} style={styles.statNumber} />
              <Skeleton width={120} height={20} style={styles.statLabel} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userTextInfo: {
    marginLeft: 16,
  },
  userName: {
    marginBottom: 8,
  },
  userLogin: {},
  scoreContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  scoreCircle: {
    borderWidth: 8,
    borderColor: "#E1E9EE",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E1E9EE",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statNumber: {
    marginBottom: 8,
  },
  statLabel: {},
});

export default QuizResultSkeleton;
