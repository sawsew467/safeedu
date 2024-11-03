import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router để chuyển trang

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter(); // Sử dụng router để điều hướng

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = () => {
    // Xóa thông báo lỗi cũ
    setError({ email: "", password: "" });

    // Kiểm tra thông tin đăng nhập
    if (email === "user1" && password === "pass1") {
      router.push("/home"); // Chuyển hướng sang trang Home
    } else {
      // Thiết lập thông báo lỗi
      setError({
        email: email !== "user1" ? "Không đúng tên đăng nhập" : "",
        password: password !== "pass1" ? "Sai mật khẩu" : "",
      });
    }
  };

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
              placeholder="Abc"
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

            <Text style={styles.googleLogin}>Đăng nhập bằng Google</Text>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Tạo tài khoản mới?</Text>
              <Text style={styles.signUpLink}>Đăng kí</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 40,
    marginBottom: 15,
    backgroundColor: "#fff",
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
    top: 8,
  },
  loginButton: {
    backgroundColor: "#75A815",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleLogin: {
    textAlign: "center",
    color: "#888",
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
