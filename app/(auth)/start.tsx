import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router"; // Import the router for navigation

const Start = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/sign-up"); // Navigate to the home screen
  };

  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/background_start.png')} // Thay đổi đường dẫn tới hình ảnh nền của bạn
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>BẮT ĐẦU HÀNH TRÌNH KIẾN THỨC</Text>
        <Text style={styles.subtitle}>Tạo hồ sơ để bắt đầu hành trình chinh phục kiến thức phòng chống ma túy!</Text>

        <View style={styles.buttonContainer}>
          {/* Nút Quay lại */}
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>

          {/* Nút Tiếp tục */}
          <TouchableOpacity style={styles.continueButton} onPress={handleNavigateToHome}>
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
    padding: 20,
   
  },
  content: {
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    flex:1,
    marginTop:250,    
  },
  title: {
    width: 300,
    fontSize: 32,
    fontWeight: '400',
    color: "#03622F",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    width: 286,
    fontSize: 14,
    fontWeight: '400',
    color: "#989EA7",
    textAlign: "left",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
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
    marginLeft: 32,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Start;
