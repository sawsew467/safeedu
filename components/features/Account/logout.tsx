import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/hooks/redux";
import { useRouter } from "expo-router";
import { ArrowLeftRight, LogOut } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";
import { setAccessToken, setRefreshToken } from "../auth/slices";
import { baseApi } from "@/store/baseQuery";

const LogOutModule = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
    router.replace("/account");
    dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
  };
  const handleSwitchAccount = () => {
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
    router.replace("/sign-in");
    dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng xuất</Text>

      <View>
        <View style={styles.categoriesContainer}>
          <Button
            className="flex flex-row justify-center items-center w-full"
            style={{ gap: 10 }}
            onPress={handleSwitchAccount}
          >
            <View className="flex flex-row justify-center items-center w-full">
              <ArrowLeftRight size={20} color="black" />
              <Text className="text-lg ml-2">Chuyển đổi tài khoản</Text>
            </View>
          </Button>
          <Button style={{ gap: 10 }} variant="primary" onPress={handleLogout}>
            <View className="flex flex-row justify-center items-center  w-full">
              <LogOut size={20} color="white" />
              <Text className="text-lg text-white ml-2">Đăng xuất</Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  categoryBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  categoryValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LogOutModule;
