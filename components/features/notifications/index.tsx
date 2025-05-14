import HeaderShown from "@/components/ui/HeaderShown";
import React, { useRef } from "react";
import Input from "../chatbot/components/input";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native";
import bg from "@/assets/images/chatbox/bg.png";

const Notification = () => {
  const scrollViewRef = useRef(null);
  return (
    <HeaderShown
      isScroll={false}
      title="Thông báo"
      isBack={false}
      ref={scrollViewRef}
      style={{ paddingBottom: 120, flexGrow: 1 }}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef?.current?.scrollTo({
          x: 0,
          y: contentHeight,
          animated: true,
        });
      }}
      // rightIcon={{
      //     icon: () => <Feather name="more-horizontal" size={24} color="black" />,
      //     onPress: handleClickMoreInfor,
      // }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Không có thông báo nào</Text>
      </View>
      <View style={styles.bg}>
        <Image
          source={bg}
          defaultSource={bg}
          style={styles.bg_image}
          resizeMode="cover"
        />
      </View>
    </HeaderShown>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  title: {
    fontSize: 24,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  bg_image: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
});
export default Notification;
