import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, FlatList, Dimensions } from "react-native";
import { usePostChatMessageMutation } from "../queries/cozeQueries";
// import { useExampleQuery, useGetAllCoursesQuery } from "../queries";
import { Button } from "@/components/ui/Button";
import HeaderShown from "@/components/ui/HeaderShown";
import bg from "@/assets/images/chatbox/bg.png"
import Feather from '@expo/vector-icons/Feather';
import avatar_chatbot from "@/assets/icons/avatar_chatbot.png"
import { COMMON_QUESTIONS } from "@/healper/data/chatbot";
import Input from "./input";
import { TypeChat } from "@/healper/type/chatbot-type";
import { content } from "@/tailwind.config";
const ListCommonQuestion = ({ text, handleClick }: { text: string, handleClick: (text: string) => void }) => (
  <Button style={styles.btn} onPress={() => handleClick(text)}>
    <Text style={styles.text_btn} className="font-pregular">{text}</Text>
  </Button>
)
const FrameChat = ({ id, content, role, }: TypeChat) => {
  return (
    <View style={[styles.container_frame_chat, { justifyContent: role === "user" ? "flex-end" : "flex-start" }]}>
      {role === "chatbot" && <Image source={avatar_chatbot} style={styles.avatar_chatbot} />}
      <View style={[styles.frame_chat, role === "user" ? styles.user_style : styles.chatbot_style]}>
        <Text style={[styles.text_frame_chat, role === "user" && { color: "#fff" }]} className="font-pregular">{content}</Text>
      </View>
    </View >)
}

const { height, width } = Dimensions.get('window'); // Lấy chiều rộng màn hình
function Chatbot() {
  const [chatData, setChatData] = React.useState<TypeChat[]>([]);
  const scrollViewRef = React.useRef(null);
  // const { data } = useGetAllCoursesQuery();
  // console.log("🚀 ~ Chatbot ~ data:", data);
  // const [postChatMessage] = usePostChatMessageMutation();

  // const handleSendMessage = async () => {
  //   const response = await postChatMessage({
  //     bot_id: "7430824648633745415",
  //     user_id: "7361642627714876433",
  //     stream: true,
  //     auto_save_history: true,
  //     additional_messages: [
  //       {
  //         role: "user",
  //         content: "biểu của ma túy",
  //         content_type: "text",
  //       },
  //     ],
  //   });
  //   console.log("Response:", response);
  // };
  const handleClickMoreInfor = () => { }
  const handleSubmit = (content: string) => {
    setChatData([...chatData, {
      id: String(chatData.length),
      content: content,
      role: "chatbot"
    }])
  }
  const handleClick = (content: string) => {
    setChatData([...chatData, {
      id: String(chatData.length),
      content: content,
      role: "user"
    }])
  }
  return (
    <HeaderShown
      title="Trợ lí tư vấn"
      ref={scrollViewRef}
      style={{ paddingBottom: 120, backgroundColor: "#000", flexGrow: 1 }}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef?.current?.scrollTo({ x: 0, y: contentHeight, animated: true })
      }}
      HeaderComponent={() => (
        <>
          <View style={styles.bg}>
            <Image source={bg} style={styles.bg_image} resizeMode="cover" />
          </View>
        </>
      )}
      FooterComponent={() =>
        <Input handleSubmit={handleSubmit} />
      }
      rightIcon={{ icon: () => <Feather name="more-horizontal" size={24} color="black" />, onPress: handleClickMoreInfor }}>
      <View style={styles.container_content}>
        <View style={styles.container_header}>
          <Image source={avatar_chatbot} />
          {chatData.length === 0 && <FlatList
            scrollEnabled={false}
            numColumns={2}
            contentContainerStyle={{ gap: 8, width: "100%", marginTop: 24, marginBottom: 20 }}
            columnWrapperStyle={{ gap: 8 }}
            data={COMMON_QUESTIONS}
            keyExtractor={(item: string) => item}
            renderItem={({ item }: { item: string }) => <ListCommonQuestion handleClick={handleClick} text={item} />} />}
        </View>
        <FlatList
          contentContainerStyle={styles.container_chat}
          scrollEnabled={false}
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: TypeChat }) => <FrameChat {...item} />}
        />
      </View>
    </HeaderShown>
  );
}

const styles = StyleSheet.create({
  avatar_chatbot: {
    width: 40,
    height: 40
  },
  user_style: {
    borderBottomEndRadius: 4,
    backgroundColor: "#75A815",
    alignSelf: 'flex-start',
    flexGrow: 0,
    maxWidth: "75%",
  },
  chatbot_style: {
    backgroundColor: "#FFE4E4",
    borderBottomStartRadius: 4,
    alignSelf: 'flex-start',
    flexGrow: 0,
    maxWidth: "90%",
  },
  frame_chat: {
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 16,
  },
  container_frame_chat: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  text_frame_chat: {
    fontSize: 16,
    flex: 1,
  },
  container_chat: {
    flex: 1,
    paddingVertical: 40,
    display: "flex",
    gap: 8,
    paddingHorizontal: 16,

  },
  text_btn: {
    fontSize: 14,
    textAlign: "left",
    width: "100%"
  },
  btn: {
    width: (width - 40) / 2,
    paddingHorizontal: 21,
    paddingVertical: 8,
    height: "auto",
    borderWidth: 1,
    justifyContent: "flex-start",
    borderColor: "#75A815",
    borderStyle: "solid",
    backgroundColor: "#F2F2F2"
  },
  container_header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 16
  },
  container_content: {
    marginTop: 20
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height
  },
  bg_image: {
    width: "100%",
    height: "100%",
  }
})

export default Chatbot;
