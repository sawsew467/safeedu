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

import Ionicons from '@expo/vector-icons/Ionicons';
import chatIcon from "@/assets/icons/menuIcon/chatIcon.png";
import news_background1 from "@/assets/images/news_image/news_background(1).png";
import news_background2 from "@/assets/images/news_image/news_background(2).png";
import linear_gradient_1 from "@/assets/images/library_images/linear_gradient_1.png";
import linear_gradient_2 from "@/assets/images/library_images/linear_gradient_2.png";
import { LIBRARY_DATA } from "@/healper/data/library";
import { router } from "expo-router";
import { DataType } from "@/healper/type/library-categories";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const imageLeft = windowWidth > 400 ? 210 : 182;

const data = [
  { id: "1", title: "Bạo lực học đường" },
  { id: "2", title: "Thông tin về ma túy" },
  { id: "3", title: "Phân biệt giới tính" },
];

function Library() {
  const [selectedId, setSelectedId] = useState("1");
  return (
    <HeaderShown title='Thư Viện'>
      <View style={styles.libraryContainer}>
        {/* <View style={styles.header}>
          <Button onPress={() => {
            router.push("/chatbot/1")
          }} style={[styles.menuButton]}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#8C8C8A" />
          </Button>
        </View> */}
        <FlatList
          overScrollMode='never'
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 26,
          }}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <TouchableOpacity>
              <View className="flex flex-row">
                <TouchableOpacity onPress={() => setSelectedId(item.id)} className="items-center">
                  <Text
                    className={`font-semibold text-base ${selectedId === item.id ? "text-[#75A815]" : "text-black"}`}
                  >
                    {item?.title}
                  </Text>
                  {selectedId === item.id && (
                    <View className="w-full h-[2px] bg-[#75A815] mt-1" />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          }
        />
        <CardList data={LIBRARY_DATA} />
      </View>
      <Image source={news_background1} style={styles.newsBackground1} />
      <Image source={news_background2} style={styles.newsBackground2} />
      <Image source={linear_gradient_1} style={styles.linearBackground1} />
      <Image source={linear_gradient_1} style={styles.linearBackground2} />
      <Image
        source={linear_gradient_2}
        style={styles.linearBackground3}
        resizeMode="contain"
      />
      <Image
        source={linear_gradient_2}
        style={styles.linearBackground4}
        resizeMode="contain"
      />
      <Image
        source={linear_gradient_1}
        style={styles.linearBackground5}
        resizeMode="contain"
      />
      <Image
        source={linear_gradient_1}
        style={styles.linearBackground6}
        resizeMode="contain"
      />
      <Image
        source={linear_gradient_2}
        style={styles.linearBackground7}
        resizeMode="contain"
      />
      <Image
        source={linear_gradient_2}
        style={styles.linearBackground8}
        resizeMode="contain"
      />
    </HeaderShown>
  );
}

export default Library;

const styles = StyleSheet.create({
  libraryContainer: {
    paddingBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  newsBackground1: {
    width: 330,
    height: 270,
    position: "absolute",
    zIndex: -10,
    top: 70,
    left: -120,
    opacity: 0.25,
    transform: [{ rotate: "15deg" }],
  },
  newsBackground2: {
    width: 352,
    height: 381,
    position: "absolute",
    zIndex: -1,
    top: 480,
    left: 125,
    opacity: 0.25,
    resizeMode: "contain",
  },
  linearBackground1: {
    width: 113,
    height: 113,
    zIndex: 2,
    position: "absolute",
    top: 90,
    left: -18,
    pointerEvents: "none",
  },
  linearBackground2: {
    width: 40,
    height: 40,
    zIndex: 2,
    position: "absolute",
    top: 236,
    left: 132,
    pointerEvents: "none",
  },
  linearBackground3: {
    width: 49,
    height: 45,
    zIndex: 2,
    position: "absolute",
    top: 400,
    left: imageLeft,
    pointerEvents: "none",
  },
  linearBackground4: {
    width: 87,
    height: 80,
    zIndex: 2,
    position: "absolute",
    top: 310,
    left: 320,
    pointerEvents: "none",
  },
  linearBackground5: {
    width: 97,
    height: 97,
    zIndex: 2,
    position: "absolute",
    top: 490,
    left: 150,
    pointerEvents: "none",
  },
  linearBackground6: {
    width: 97,
    height: 97,
    zIndex: 2,
    position: "absolute",
    top: 550,
    left: 310,
    pointerEvents: "none",
  },
  linearBackground7: {
    width: 97,
    height: 97,
    zIndex: 2,
    position: "absolute",
    top: 690,
    left: 200,
    pointerEvents: "none",
  },
  linearBackground8: {
    width: 97,
    height: 97,
    zIndex: 2,
    position: "absolute",
    top: 750,
    left: 344,
    pointerEvents: "none",
  },
  header: {
    padding: 20,
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
