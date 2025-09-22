import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router để chuyển trang
import { useSignInMutation } from "@/services/auth/auth.api";
import { useAppDispatch } from "@/hooks/redux";
import { baseApi } from "@/store/baseQuery";
import { BlurView } from "expo-blur"; // Import BlurView để làm mờ nền
import { setNotifycaUpdateProfile } from "./slices";
const SignInModule = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [signIn, { isLoading }] = useSignInMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    setError({ username: "", password: "" });
    if (!username)
      setError({ username: "Tên tài khoản không được để trống", password: "" });
    if (!password)
      setError({ username: "", password: "Mật khẩu không được để trống" });
    try {
      await signIn({ username, password }).unwrap();
      dispatch(setNotifycaUpdateProfile(true));
      dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
      router.push("/account");
    } catch (error) {
      const message: string =
        (error as any)?.data?.error?.message || "Đã xảy ra lỗi!";
      const details: string =
        (error as any)?.data?.error?.details || "Đã xảy ra lỗi!";

      if (details.includes("Username")) {
        setError({ username: message, password: "" });
      } else if (details.includes("Password ")) {
        setError({ username: "", password: message });
      }
    }
  };
  const handleSignUp = () => {
    router.push("/user-type-screen");
  };
  const handleGoHome = () => {
    router.push("/home");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <View className="flex-1 relative bg-white/50">
      <ImageBackground
        source={require("assets/images/sign-in-background.png")}
        className="w-[100%] h-[60%] top-0 absolute"
        imageStyle={{ resizeMode: "cover" }}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1 "
      >
        <View className="flex-1 relative mb-20 ">
          <View className="flex flex-1 justify-center items-center  pt-[300px]">
            <BlurView
              intensity={100}
              tint="light"
              className="rounded-lg border-1 border-gray-100 overflow-hidden"
            >
              <View className="w-[90%] p-5 rounded-[20px]">
                <Text className="text-[16px] font-pmedium text-black mb-[8px]">
                  Tên tài khoản
                </Text>
                <View style={styles.input} className="px-4 flex justify-center">
                  <TextInput
                    placeholder="Nhập tên tài khoản"
                    value={username}
                    onChangeText={setUsername}
                    style={{ flex: 1 }}
                  />
                </View>
                {error.username ? (
                  <Text style={styles.errorText}>{error.username}</Text>
                ) : null}

                <View className="flex flex-row w-full justify-between mt-2">
                  <Text style={styles.label} className="font-pmedium">
                    Mật khẩu
                  </Text>
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text className="text-primary font-pmedium underline underline-offset-4">
                      Quên mật khẩu
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                  <View
                    style={styles.input}
                    className="px-4 flex justify-center relative"
                  >
                    <TextInput
                      placeholder="Nhập mật khẩu"
                      secureTextEntry={!passwordVisible}
                      value={password}
                      style={{ flex: 1 }}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      className="absolute right-4 top-1/2translate-y-[50px]"
                    >
                      <Ionicons
                        name={passwordVisible ? "eye" : "eye-off"}
                        size={24}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {error.password ? (
                  <Text style={styles.errorText}>{error.password}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSignIn}
                  disabled={isLoading}
                >
                  <Text style={styles.loginText} className="font-pmedium">
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText} className="font-pregular">
                    Tạo tài khoản mới?
                  </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text
                      style={styles.signUpLink}
                      className="text-primary font-pmedium"
                    >
                      Đăng kí tại đây
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Quay lại</Text>
                  <TouchableOpacity onPress={handleGoHome}>
                    <Text
                      style={styles.signUpLink}
                      className="text-primary font-pmedium"
                    >
                      Trang chủ
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderRadius: 16,
    boxShadow: "0 2 20 -10",
    paddingLeft: 16,
    paddingRight: 40,
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  passwordContainer: {
    position: "relative",
  },
  loginButton: {
    marginTop: 7,
    backgroundColor: "#75A815",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleLogin: {
    textAlign: "center",
    color: "black",
    marginTop: 28,
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#888",
    fontSize: 14,
  },
  signUpLink: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default SignInModule;
