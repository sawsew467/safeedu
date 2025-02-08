import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
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
    // <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/backgroundSignin.png')} // Đường dẫn đến ảnh trong thư mục nội bộ
          style={styles.avatar}
        />
      </View>


      <View style={styles.form}>
        <Text style={styles.label}>Nhập tên của bạn</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Nhập ngày sinh</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={dob}
          onChangeText={setDob}
        />

        <Text style={styles.label}>Nhập email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

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
            <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="●●●●●●●"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#FFFFFF",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#75A815",
  },
  form: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "40%",
    transform: [{ translateY: -12 }],
  },
  signUpButton: {
    marginTop: 16,
    backgroundColor: "#75A815",
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;
