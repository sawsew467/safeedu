import { Button } from "@/components/ui/Button";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import searchIcon from "@/assets/icons/menuIcon/searchIcon.png";
import notificationIcon from "@/assets/icons/menuIcon/notificationIcon.png";
import { NavMenu } from "@/components/features/News/NavMenu";
import { NewSection } from "@/components/features/News/NewSection";
import news_background1 from "@/assets/images/news_image/news_background(1).png";
import news_background_2 from "@/assets/images/news_image/news_background_2.png";

const styles = StyleSheet.create({
  backgroundContainer: {
    // width: 200,
    // height: 381,
    position: 'absolute',
    zIndex: -1,
    top: 500,
    left: 180,
  },
  background: {
    width: 200,
    height: 381,
    // objectFit: 'cover'
  }
})

function News() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white">
      <ScrollView
        // overScrollMode="never"
        bounces={false}
      >
        <NavMenu />
        <NewSection />
      </ScrollView>
      <Image source={news_background1} className="w-[330px] h-[270px] absolute -z-10 top-[320px] -left-[120px] opacity-10 rotate-[15deg]" />
      <View style={styles.backgroundContainer}>
        <Image style={[styles.background, { resizeMode: 'contain' }]} source={news_background_2} />
      </View>
    </SafeAreaView>
  );
}

export default News;
