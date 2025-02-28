import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";

const SignUp = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [className, setClassName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSignUp = () => {
    router.push("/sign-in");
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/phone-verification-background.png')} // Thay đổi đường dẫn tới hình ảnh nền của bạn
        className="absolute top-0 bottom-0 left-0 right-0"
        resizeMode="cover"

      />
      <View className="px-4 pt-[90px]">
        <View className="bg-white w-full h-[100%] rounded-t-[40px] px-6 py-4">
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text className="text-center font-semibold text-2xl text-primary mb-5">Đăng ký</Text>

            <Text className="font-semibold text-base text-[#959595]">Họ</Text>
            <TextInput
              placeholder="Nguyễn"
              placeholderTextColor="#C4C4C4"
              value={lastName}
              onChangeText={setLastName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Tên</Text>
            <TextInput
              placeholder="Văn A"
              placeholderTextColor="#C4C4C4"
              value={firstName}
              onChangeText={setFirstName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Ngày sinh</Text>
            <TextInput
              placeholder="19/05/1896"
              placeholderTextColor="#C4C4C4"
              value={dob}
              onChangeText={setDob}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Số điện thoại</Text>
            <TextInput
              placeholder="0123456789"
              placeholderTextColor="#C4C4C4"
              value={phone}
              onChangeText={setPhone}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Tỉnh/Thành phố</Text>
            <TextInput
              placeholder="Đà Nẵng"
              placeholderTextColor="#C4C4C4"
              value={city}
              onChangeText={setCity}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Trường</Text>
            <TextInput
              placeholder="THPT Ngũ Hành Sơn"
              placeholderTextColor="#C4C4C4"
              value={school}
              onChangeText={setSchool}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <Text className="font-semibold text-base text-[#959595]">Lớp</Text>
            <TextInput
              placeholder="12A1"
              placeholderTextColor="#C4C4C4"
              value={className}
              onChangeText={setClassName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2 mb-5" />

            <TouchableOpacity
              className="mt-2 max-w-full items-center justify-center bg-primary py-3 rounded-3xl"
              onPress={handleSignUp}
            >
              <Text className="text-white text-lg font-normal">Tiếp tục</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
};


export default SignUp;
