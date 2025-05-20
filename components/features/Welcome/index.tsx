import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import logo from "@/assets/images/logo_new.png";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/redux";

const Welcome = () => {
  const handleRedirect = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex justify-center items-center mt-10">
            <Image
              source={logo}
              className="w-[240px] h-[240px]"
              resizeMode="contain"
            />
            <Text
              style={{ fontSize: 60 }}
              className="leading-[70px] text-black font-psemibold"
            >
              SafeEdu
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-700 mt-1 text-center">
            Chào mừng bạn đã đến với SafeEdu. Ứng dụng giáo dục về phòng chống
            ma tuý cho học sinh, sinh viên
          </Text>

          <Button
            onPress={handleRedirect}
            className="mt-4 w-full"
            variant="primary"
          >
            Tiếp tục truy cập
          </Button>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="" style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
