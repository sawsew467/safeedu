import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import PhoneInput from "react-native-phone-input";

const PhoneVerification = () => {
  const phoneRef = useRef(null);

  const onPressFlag = () => {
    if (phoneRef.current) {
      phoneRef.current.onPressFlag();
    }
  };

  const router = useRouter();

  const handleNavigateToOTPVerification = () => {
    router.push("/otp-verification");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/images/phone-verification-background.png")}
        className="absolute top-0 bottom-0 left-0 right-0"
        resizeMode="cover"
      />
      <View className="flex-1 px-6">
        <View className="flex-1 mt-14">
          <View className="gap-1">
            <Text className="text-white text-4xl font-bold">Bắt đầu</Text>
            <Text className="text-white text-base font-normal">
              Hãy nhập số điện thoại
            </Text>
          </View>
          <View className="mt-3 pb-1">
            <PhoneInput
              ref={phoneRef}
              initialCountry="vn"
              textProps={{
                placeholder: "Nhập số điện thoại...",
                placeholderTextColor: "white",
              }}
              flagStyle={styles.flag}
              style={styles.phoneInput}
              textStyle={styles.textInput}
            />
            <View style={styles.underline} />
          </View>
        </View>
        <View className="h-[13%] mb-5">
          <Text className="font-normal text-lg text-white mb-4">
            Gửi tôi một mã xác nhận thông qua SMS
          </Text>
          <TouchableOpacity
            className="flex-1 max-w-full items-center justify-center bg-primary py-3 rounded-3xl shadow-md shadow-black/20"
            onPress={handleNavigateToOTPVerification}
          >
            <Text className="text-white text-lg font-normal">Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    backgroundColor: "transparent",
    width: "100%",
  },
  textInput: {
    color: "white",
    fontSize: 18,
  },
  flag: {
    width: 24,
    height: 16,
  },
  underline: {
    width: "100%",
    height: 1.5,
    backgroundColor: "white",
    marginTop: 4,
  },
});

export default PhoneVerification;
