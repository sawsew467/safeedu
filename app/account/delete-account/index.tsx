import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import androidStyles from "@/components/ui/SafeViewAndroid";
import { Stack, useRouter } from "expo-router";
import background from "@/assets/images/account/background.png";

const DeleteAccount = () => {
  const router = useRouter();

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  const handleCancel = () => {
    router.push("/account");
  };

  return (
    <>
      <SafeAreaView style={androidStyles.AndroidSafeArea}>
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <ImageBackground source={background} className="w-full h-full" />
        </View>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>

        <View className="flex-1 flex justify-center items-center">
          <View>
            <Text className="text-center text-2xl font-pbold">
              xóa tài khoản vĩnh viễn?
            </Text>
            <Text className="text-center text-lg font-pregular">
              Tài khoản và nội dung của bạn sẽ bị xóa vĩnh viễn. Bạn có chắc
              chắn muốn xóa tài khoản này?
            </Text>
          </View>
          <View className="px-4 mt-4 flex flex-row" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 flex-row h-[60px] bg-gray-200 rounded-2xl py-2 flex items-center m-0 justify-center"
            >
              <Text className="text-black  text-lg font-pbold">hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteAccount}
              className="flex-1 flex-row h-[60px] bg-red-500 text-white rounded-2xl py-2 flex items-center m-0 justify-center"
            >
              <Text className="text-white text-lg font-pbold">Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DeleteAccount;
