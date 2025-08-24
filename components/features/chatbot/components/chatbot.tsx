import { StyleSheet, View, Image, ImageBackground } from "react-native";
import React from "react";

// import { useExampleQuery, useGetAllCoursesQuery } from "../queries";

import bg from "@/assets/images/chatbox/bg.png";

import ChatContent from "./ChatContent";
import { useMemo } from "react";
import HeaderShown from "@/components/ui/HeaderShown";

function Chatbot() {
  return (
    <HeaderShown
      shouldHaveHeader={false}
      backgroundImage={() => <ImageBackground source={bg} style={styles.bg} />}
      isScroll={false}
    >
      <View style={styles.container_content}>
        <ChatContent />
      </View>
    </HeaderShown>
  );
}

const styles = StyleSheet.create({
  container_content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Chatbot;
