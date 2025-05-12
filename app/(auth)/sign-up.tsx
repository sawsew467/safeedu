import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";

const SignUp = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    school: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    agreement: ""
  });

  const router = useRouter();
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSignUp = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      dob: "",
      city: "",
      school: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      agreement: ""
    };
    let hasError = false;

    // Required field validations
    if (!lastName) {
      newErrors.lastName = "Vui lòng nhập họ";
      hasError = true;
    }
    if (!firstName) {
      newErrors.firstName = "Vui lòng nhập tên";
      hasError = true;
    }
    if (!dob) {
      newErrors.dob = "Vui lòng chọn ngày sinh";
      hasError = true;
    }
    if (userType === "student" && !city) {
      newErrors.city = "Vui lòng chọn thành phố";
      hasError = true;
    }
    if (userType === "student" && !school) {
      newErrors.school = "Vui lòng chọn trường";
      hasError = true;
    }
    if (!userName) {
      newErrors.userName = "Vui lòng nhập tên đăng nhập";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      hasError = true;
    }
    if (!isAgreed) {
      newErrors.agreement = "Bạn phải đồng ý với điều khoản và điều kiện";
      hasError = true;
    }

    if (userName && !/^[a-zA-Z0-9_-]+$/.test(userName)) {
      newErrors.userName = "Tên đăng nhập chỉ được chứa chữ cái không dấu, số, dấu gạch dưới và dấu gạch ngang";
      hasError = true;
    }
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,}$/.test(password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ in hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
      hasError = true;
    }
    if (confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      hasError = true;
    }

    setError(newErrors);

    if (!hasError) {
      router.push("/sign-in");
    }
  };

  const handleNavigationToSignIn = () => {
    router.push("/sign-in");
  };

  const { userType } = useLocalSearchParams();
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/phone-verification-background.png')}
        className="absolute top-0 bottom-0 left-0 right-0"
        resizeMode="cover"
      />
      <View className="px-4 pt-[90px]">
        <View className="bg-white w-full h-[100%] rounded-t-[40px] px-6 py-4">
          <Text className="text-center font-semibold text-2xl text-primary mb-5">
            {userType === "student"
              ? "Đăng ký Học sinh"
              : userType === "citizen"
                ? "Đăng ký Người dân"
                : null
            }
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="font-semibold text-base text-[#959595]">
              Họ <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Nguyễn"
              placeholderTextColor="#C4C4C4"
              value={lastName}
              onChangeText={setLastName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.lastName ? <Text className="text-red-500 text-xs mt-2">{error.lastName}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Tên <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Văn A"
              placeholderTextColor="#C4C4C4"
              value={firstName}
              onChangeText={setFirstName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.firstName ? <Text className="text-red-500 text-xs mt-2">{error.firstName}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Ngày sinh <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="19/05/1896"
              placeholderTextColor="#C4C4C4"
              value={dob}
              onChangeText={setDob}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.dob ? <Text className="text-red-500 text-xs mt-2">{error.dob}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">Số điện thoại</Text>
            <TextInput
              placeholder="0123456789"
              placeholderTextColor="#C4C4C4"
              value={phone}
              onChangeText={setPhone}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.phone ? <Text className="text-red-500 text-xs mt-2">{error.phone}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">Email</Text>
            <TextInput
              placeholder="Nhập email"
              placeholderTextColor="#C4C4C4"
              value={email}
              onChangeText={setEmail}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.email ? <Text className="text-red-500 text-xs mt-2">{error.email}</Text> : null}

            {userType === "student" && (
              <>
                <Text className="font-semibold text-base text-[#959595] mt-5">
                  Tỉnh/Thành phố <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="Đà Nẵng"
                  placeholderTextColor="#C4C4C4"
                  value={city}
                  onChangeText={setCity}
                  className="text-lg text-black pl-0 pb-0"
                />
                <View className="w-full h-[1.5px] bg-black mt-2" />
                {error.city ? <Text className="text-red-500 text-xs mt-2">{error.city}</Text> : null}

                <Text className="font-semibold text-base text-[#959595] mt-5">
                  Trường <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  placeholder="THPT Ngũ Hành Sơn"
                  placeholderTextColor="#C4C4C4"
                  value={school}
                  onChangeText={setSchool}
                  className="text-lg text-black pl-0 pb-0"
                />
                <View className="w-full h-[1.5px] bg-black mt-2" />
                {error.school ? <Text className="text-red-500 text-xs mt-2">{error.school}</Text> : null}
              </>
            )}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Tên tài khoản <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="vana"
              placeholderTextColor="#C4C4C4"
              value={userName}
              onChangeText={setUserName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.userName ? <Text className="text-red-500 text-xs mt-2">{error.userName}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Mật khẩu <Text className="text-red-500">*</Text>
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#C4C4C4"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                className="text-lg text-black pl-0 pb-0 pr-10"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.password ? <Text className="text-red-500 text-xs mt-2">{error.password}</Text> : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Xác nhận mật khẩu <Text className="text-red-500">*</Text>
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor="#C4C4C4"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                className="text-lg text-black pl-0 pb-0 pr-10"
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name={confirmPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.confirmPassword ? <Text className="text-red-500 text-xs mt-2">{error.confirmPassword}</Text> : null}

            <TouchableOpacity
              className="flex-row items-center mb-5 mt-5"
              onPress={() => setIsAgreed(!isAgreed)}
              activeOpacity={0.8}
            >
              <View className={`w-5 h-5 mr-2 border rounded-sm ${isAgreed ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                {isAgreed && (
                  <Ionicons name="checkmark" size={16} color="white" style={{ textAlign: "center" }} />
                )}
              </View>
              <Text className="text-sm text-[#959595]">
                Tôi đồng ý với điều khoản & bảo mật
              </Text>
            </TouchableOpacity>
            {error.agreement ? <Text className="text-red-500 text-xs mt-2">{error.agreement}</Text> : null}

            <TouchableOpacity
              className="mt-5 max-w-full items-center justify-center bg-primary py-3 rounded-3xl"
              onPress={handleSignUp}
            >
              <Text className="text-white text-lg font-normal">Hoàn tất đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-5 mb-3 max-w-full items-center justify-center"
              onPress={handleNavigationToSignIn}
            >
              <Text className="text-primary text-lg font-normal underline">Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SignUp;