import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router để chuyển trang
import * as Google from "expo-auth-session/providers/google";
import { useAuthRequest } from "expo-auth-session";
import { useSignInMutation } from "@/services/auth/auth.api";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const [signIn, { isLoading }] = useSignInMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    setError({ username: "", password: "" });
    try {
      await signIn({ username, password }).unwrap();
      router.push("/home");
    } catch (error) {
      const message: string =
        (error as any)?.data?.error?.message || "Đã xảy ra lỗi!";
      const details: string =
        (error as any)?.data?.error?.details || "Đã xảy ra lỗi!";

      console.log("first", message);
      if (details.includes("Username")) {
        setError({ username: message, password: "" });
      } else if (details.includes("Password ")) {
        setError({ username: "", password: message });
      }
    }
  };
  const handleSignUp = () => {
    router.push("/start");
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground
        source={require("../../assets/images/sign-in-background.png")}
        className="w-[100%] h-[85%] absolute"
        imageStyle={{ resizeMode: "cover" }}
      ></ImageBackground>
      <View className="flex justify-center items-center top-2/3">
        <View className="w-[90%] p-5 rounded-[20px]">
          <Text className="text-[16px] font-bold text-black mb-[8px]">
            Tên tài khoản
          </Text>
          <View style={styles.input} className="px-4 flex justify-center">
            <TextInput
              placeholder="example"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          {error.username ? (
            <Text style={styles.errorText}>{error.username}</Text>
          ) : null}

          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <View
              style={styles.input}
              className="px-4 flex justify-center relative"
            >
              <TextInput
                placeholder="●●●●●●●"
                secureTextEntry={!passwordVisible}
                value={password}
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

          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginText}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Tạo tài khoản mới?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default SignIn;
