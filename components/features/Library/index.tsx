import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import { Button } from "@/components/ui/Button";
import CardList from "@/components/features/Library/CardList";
import HeaderShown from '@/components/ui/HeaderShown';

import Ionicons from "@expo/vector-icons/Ionicons";
import chatIcon from "@/assets/icons/menuIcon/chatIcon.png";
import news_background1 from "@/assets/images/news_image/news_background1.png";
import news_background2 from "@/assets/images/news_image/news_background2.png";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import HeaderShown from "@/components/ui/HeaderShown";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

function Library() {
  const [selectedId, setSelectedId] = useState("1");
  return (
    <HeaderShown title="Thư viện" isScroll={false}>
      <View style={styles.libraryContainer}>
        <CardList />
      </View>
      <Image source={news_background1} style={styles.newsBackground1} />
      <Image source={news_background2} style={styles.newsBackground2} />
    </HeaderShown>
  );
}

export default Library;

const styles = StyleSheet.create({
  container_scroll: {
    zIndex: 1,
  },
  libraryContainer: {
    flex: 1,
    paddingBottom: 50,
    zIndex: 2,
  },
  newsBackground1: {
    width: 330,
    height: 270,
    position: "absolute",
    zIndex: 0,
    top: 70,
    left: -120,
    opacity: 0.25,
    transform: [{ rotate: "15deg" }],
  },
  newsBackground2: {
    width: 352,
    height: 381,
    position: "absolute",
    zIndex: 0,
    top: 480,
    left: 125,
    opacity: 0.25,
    resizeMode: "contain",
  },

  header: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 38.4,
    textAlign: "center",
  },

  menuButton: {
    width: 54,
    height: 54,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    backgroundColor: "#F8F8F8",
    gap: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 12,
  },
  chatIconContainer: {
    width: 18,
    height: 18,
    top: 100,
  },
  chatIcon: {
    width: "100%",
    height: "100%",
  },
});
