import Skeleton from "@/components/ui/skeleton";
import { View, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const LeaderboardSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Skeleton width={30} height={30} radius={15} />
        <Skeleton width={150} height={24} radius={12} />
        <View style={styles.spacer} />
      </View>

      {/* Participants count */}
      <View style={styles.participantsSection}>
        <Skeleton width={180} height={32} radius={16} />
      </View>

      {/* Crown icon */}
      <View style={styles.crownSection}>
        <Skeleton width={60} height={50} radius={8} />
      </View>

      {/* Top 3 podium */}
      <View style={styles.podiumSection}>
        {/* Second place */}
        <View style={styles.podiumUser}>
          <Skeleton width={80} height={80} radius={40} />
          <Skeleton width={60} height={16} radius={8} style={styles.userName} />
          <Skeleton width={40} height={20} radius={10} />
        </View>

        {/* First place */}
        <View style={[styles.podiumUser, styles.firstPlace]}>
          <Skeleton width={100} height={100} radius={50} />
          <Skeleton width={80} height={16} radius={8} style={styles.userName} />
          <Skeleton width={40} height={20} radius={10} />
        </View>

        {/* Third place */}
        <View style={styles.podiumUser}>
          <Skeleton width={80} height={80} radius={40} />
          <Skeleton width={60} height={16} radius={8} style={styles.userName} />
          <Skeleton width={40} height={20} radius={10} />
        </View>
      </View>

      {/* Podium base */}
      <View style={styles.podiumBase}>
        <Skeleton width={screenWidth - 40} height={80} radius={12} />
      </View>

      {/* User list */}
      <View style={styles.userList}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.userItem}>
            <Skeleton width={60} height={60} radius={30} />
            <View style={styles.userInfo}>
              <Skeleton width={120} height={18} radius={9} />
              <Skeleton
                width={100}
                height={14}
                radius={7}
                style={styles.username}
              />
            </View>
            <Skeleton width={80} height={24} radius={12} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  spacer: {
    width: 30,
  },
  participantsSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  crownSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  podiumSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  podiumUser: {
    alignItems: "center",
    flex: 1,
  },
  firstPlace: {
    marginBottom: 20,
  },
  userName: {
    marginTop: 12,
    marginBottom: 8,
  },
  podiumBase: {
    alignItems: "center",
    marginBottom: 30,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    marginTop: 6,
  },
});

export default LeaderboardSkeleton;
