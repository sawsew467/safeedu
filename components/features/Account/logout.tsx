import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigation, useRouter } from "expo-router";
import {
  ArrowLeftRight,
  LogOut,
  UserPen,
  UserRoundX,
} from "lucide-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { setAccessToken, setRefreshToken } from "../auth/slices";
import { baseApi } from "@/store/baseQuery";

const LogOutModule = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
    dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
    router.replace("/account");
  };

  const handleDeleteAccount = () => {
    router.replace("/account/delete-account");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full flex-row h-[60px] bg-gray-300 rounded-2xl py-2 flex items-center m-0 justify-center"
      >
        <LogOut size={20} color="black" />
        <Text className="text-lg text-black ml-2">Đăng xuất</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteAccount}
        className="w-full flex-row h-[60px] bg-red-700 rounded-2xl py-2 flex items-center m-0 justify-center"
      >
        <UserRoundX size={20} color="white" />
        <Text className="text-lg text-white ml-2">xóa tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    gap: 20,
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
    flexDirection: "column",
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
