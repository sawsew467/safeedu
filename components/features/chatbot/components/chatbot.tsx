import {
  StyleSheet,

  View,
  Image,

} from "react-native";

// import { useExampleQuery, useGetAllCoursesQuery } from "../queries";

import bg from "@/assets/images/chatbox/bg.png";

import ChatContent from "./ChatContent";
import { useMemo } from "react";

function Chatbot() {
  console.log('1', 1)
  const background = useMemo(() => {
    return <Image source={bg} defaultSource={bg} style={styles.bg_image} resizeMode="cover" />
  }, [])
  return (
    <>
      <View style={styles.container_content}>
        <ChatContent />
      </View>
      <View style={styles.bg}>
        {background}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container_content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  bg_image: {
    width: "100%",
    height: "100%",
  },
});

export default Chatbot;
