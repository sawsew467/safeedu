import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router để chuyển trang
import * as Google from "expo-auth-session/providers/google";
import { useAuthRequest } from "expo-auth-session";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter(); // Sử dụng router để điều hướng
    // Tạo yêu cầu đăng nhập với Google
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "YOUR_CLIENT_ID.apps.googleusercontent.com",
    });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = () => {
    // Xóa thông báo lỗi cũ
    setError({ email: "", password: "" });

    // Kiểm tra thông tin đăng nhập
    if (email === "user1" && password === "pass1") {
      router.push("/home"); 
    } else {
      // Thiết lập thông báo lỗi
      setError({
        email: email !== "user1" ? "Không tìm thấy email" : "",
        password: password !== "pass1" ? "Sai mật khẩu" : "",
      });
    }
  };
  const handleSignUp = () => {
    router.push("/start"); 
  };

   // Xử lý khi nhấn vào Đăng nhập bằng Google
   const handleGoogleSignIn = async () => {
    if (request) {
      promptAsync();
    }
  };

  // Xử lý phản hồi từ API Google
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Ở đây bạn có thể gọi API backend để xác thực token từ Google
      console.log("Google Auth Token:", authentication);
      router.push("/home"); 
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/background 2.png")}
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>Nhập email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
            {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

            <Text style={styles.label}>Nhập mật khẩu</Text>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 200,
  },
  form: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingLeft: 10,
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
    marginTop: 16,
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
    marginTop: 15,
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
