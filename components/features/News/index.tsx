import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/redux";

import { NavMenu } from "@/components/features/News/NavMenu";
import { NewSection } from "@/components/features/News/NewSection";

import news_background from "@/assets/images/news_image/news_background.png";
import HeaderShown from "@/components/ui/HeaderShown";
import constants from "@/settings/constants";
import { Alert } from "@/components/ui/alert";

const styles = StyleSheet.create({
  newsBackground1: {
    width: 330,
    height: 270,
    position: "absolute",
    zIndex: 0,
    top: 320,
    left: -120,
    opacity: 0.1,
    transform: [{ rotate: "15deg" }],
  },
  backgroundContainer: {
    position: "absolute",
    zIndex: 0,
    top: 500,
    right: 0,
  },
  newsBackground2: {
    width: 200,
    height: 381,
    resizeMode: "contain",
  },
  scroll_container: {
    zIndex: 1,
  },
});

function News() {
  const router = useRouter();
  const access_token = useAppSelector((state) => state.auth.access_token);

  useEffect(() => {
    const checkAndShowLoginPrompt = async () => {
      try {
        if (access_token) {
          return;
        }

        // Hiển thị Alert khuyến khích đăng nhập
        Alert.alert(
          "Đăng nhập để trải nghiệm tốt hơn",
          "Đăng nhập ngay để có thể tham gia các cuộc thi, theo dõi thành tích và nhiều tính năng khác!",
          [
            {
              text: "Hủy",
              style: "cancel",
              onPress: async () => {
                // Lưu trạng thái đã hiển thị
                await AsyncStorage.setItem(
                  constants.LOGIN_PROMPT_SHOWN,
                  "true"
                );
              },
            },
            {
              text: "Đăng nhập",
              onPress: async () => {
                // Lưu trạng thái đã hiển thị
                await AsyncStorage.setItem(
                  constants.LOGIN_PROMPT_SHOWN,
                  "true"
                );
                // Navigate đến trang đăng nhập
                router.push("/(auth)/sign-in");
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error checking login prompt:", error);
      }
    };

    checkAndShowLoginPrompt();
  }, [access_token, router]);

  return (
    <HeaderShown
      shouldHaveHeader={false}
      backgroundImage={() => (
        <ImageBackground
          source={news_background}
          style={styles.newsBackground1}
        />
      )}
    >
      <View style={styles.scroll_container}>
        <NavMenu />
        <NewSection />
      </View>
    </HeaderShown>
  );
}
export default News;
