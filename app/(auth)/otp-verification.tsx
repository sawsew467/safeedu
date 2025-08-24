import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import HeaderShown from "@/components/ui/HeaderShown";

const OTPVerification = () => {
  const handleNavigationToUserType = () => {
    router.push("/user-type-screen");
  };

  return (
    <HeaderShown>
      <ImageBackground
        source={require("../../assets/images/phone-verification-background.png")}
        className="absolute top-0 bottom-0 left-0 right-0"
        resizeMode="cover"
      />
      <View className="flex-1 px-6 justify-center">
        <View className="flex justify-center items-center">
          <Image
            source={require("../../assets/images/login/otp-verification-screen/otp_logo.png")}
            className="w-[200px] h-[240px]"
            resizeMode="cover"
          />
        </View>
        <Text className="mt-16 font-semibold text-2xl text-white">
          Nhập mã OTP
        </Text>
        <Text className="font-normal text-sm text-white">
          Mã gồm 4 chữ số đã được gửi tới số{" "}
          <Text className="font-semibold text-sm text-[#89B1FF]">
            0123456789
          </Text>
        </Text>
        <OtpInput
          numberOfDigits={6}
          type="numeric"
          autoFocus={false}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
          }}
        />
        <TouchableOpacity
          className="mt-16 max-w-full items-center justify-center bg-primary py-3 rounded-3xl shadow-md shadow-black/20"
          onPress={handleNavigationToUserType}
        >
          <Text className="text-white text-lg font-normal">Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-5 max-w-full items-center justify-center bg-white py-3 rounded-3xl shadow-md shadow-black/20">
          <Text className="text-primary text-lg font-normal">Gửi lại OTP</Text>
        </TouchableOpacity>
      </View>
    </HeaderShown>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  pinCodeContainer: {
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: 48,
    height: 48,
  },
  filledPinCodeContainer: {
    backgroundColor: "rgb(255, 255, 255)",
  },
  pinCodeText: {
    fontWeight: "400",
    fontSize: 16,
    color: "#000000",
  },
});

export default OTPVerification;
