import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router để chuyển trang
import * as Google from "expo-auth-session/providers/google";
import { useAuthRequest } from "expo-auth-session";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_CLIENT_ID.apps.googleusercontent.com",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = () => {

    setError({ email: "", password: "" });


    if (email === "user1" && password === "pass1") {
      router.push("/home");
    } else {

      setError({
        email: email !== "user1" ? "Không tìm thấy email" : "",
        password: password !== "pass1" ? "Sai mật khẩu" : "",
      });
    }
  };
  const handleSignUp = () => {
    router.push("/start");
  };


  const handleGoogleSignIn = async () => {
    if (request) {
      promptAsync();
    }
  };


  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      console.log("Google Auth Token:", authentication);
      router.push("/home");
    }
  }, [response]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground
        source={require("../../assets/images/sign-in-background.png")}
        className="w-[100%] h-[85%] absolute"
        imageStyle={{ resizeMode: "cover" }}
      >
      </ImageBackground>
      <View className="flex justify-center items-center top-2/3">
        <View className="w-[90%] p-5 rounded-[20px]">
          <Text className="text-[16px] font-bold text-black mb-[8px]">Tên tài khoản</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="●●●●●●●"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoogleSignIn}>
            <Text style={styles.googleLogin}>Đăng nhập bằng Google</Text>
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "40%",
    transform: [{ translateY: -12 }],
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
