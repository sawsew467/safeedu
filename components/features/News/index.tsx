import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import { NavMenu } from "@/components/features/News/NavMenu";
import { NewSection } from "@/components/features/News/NewSection";

import news_background from "@/assets/images/news_image/news_background.png";
import HeaderShown from "@/components/ui/HeaderShown";

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
  return (
    <HeaderShown
      shouldHaveHeader={false}
      isScroll={false}
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
