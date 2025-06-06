import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

const Start = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/user-type-screen");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 relative bg-white">
      <ImageBackground
        source={require("../../assets/images/start-background.png")}
        className="w-[100%] h-[70%] absolute bg-white"
        resizeMode="contain"
      ></ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>BẮT ĐẦU HÀNH TRÌNH KIẾN THỨC</Text>
        <Text style={styles.subtitle}>
          Tạo hồ sơ để bắt đầu hành trình chinh phục kiến thức phòng chống ma
          túy!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleNavigateToHome}
          >
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    padding: 0,
    flex: 1,
    marginTop: "105%",
  },
  title: {
    width: 300,
    fontSize: 32,
    fontWeight: "400",
    color: "#03622F",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    width: 286,
    fontSize: 14,
    fontWeight: "400",
    color: "#989EA7",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  backButton: {
    width: 128,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    boxShadow: "0 2 20 -10",
    marginRight: 32,
    elevation: 4,
  },
  backButtonText: {
    color: "#75A815",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    width: 128,
    alignItems: "center",
    backgroundColor: "#75A815",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    boxShadow: "0 2 20 -10",
    marginLeft: 32,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Start;
