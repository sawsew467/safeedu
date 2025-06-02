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
import { useDeleteAccountMutation } from "@/services/user/user.api";
import {
  setAccessToken,
  setRefreshToken,
} from "@/components/features/auth/slices";
import { baseApi } from "@/store/baseQuery";
import { useAppDispatch } from "@/hooks/redux";

import background from "@/assets/images/account/background.png";

const DeleteAccount = () => {
  const router = useRouter();

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async () => {
    await deleteAccount(undefined).unwrap();
    dispatch(setAccessToken(""));
    dispatch(setRefreshToken(""));
    dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
    router.push("/account");
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
        />

        <View className="flex-1 flex justify-center items-center px-4">
          <View>
            <Text className="text-center text-2xl font-pbold">
              Xóa tài khoản vĩnh viễn?
            </Text>
            <Text className="text-center text-lg font-pregular">
              Tài khoản và nội dung của bạn sẽ bị xóa vĩnh viễn. Bạn có chắn
              chắn muốn xóa tài khoản? Thao tác này không thể hoàn tác.
            </Text>
          </View>
          <View className="px-4 mt-4 flex flex-row" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 flex-row h-[60px] bg-gray-200 rounded-2xl py-2 flex items-center m-0 justify-center"
            >
              <Text className="text-black  text-lg font-pbold">Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteAccount}
              className="flex-1 flex-row h-[60px] bg-red-500 text-white rounded-2xl py-2 flex items-center m-0 justify-center"
            >
              <Text className="text-white text-lg font-pbold">
                {isLoading ? "Đang xóa..." : "Xóa tài khoản"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DeleteAccount;
