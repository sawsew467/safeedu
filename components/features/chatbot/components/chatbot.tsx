import React from "react";
import { StyleSheet, Text, View, Image, FlatList, Dimensions } from "react-native";
import { usePostChatMessageMutation } from "../queries/cozeQueries";
// import { useExampleQuery, useGetAllCoursesQuery } from "../queries";
import { Button } from "@/components/ui/Button";
import HeaderShown from "@/components/ui/HeaderShown";
import bg from "@/assets/images/chatbox/bg.png"
import more_icon from "@/assets/icons/more_infor.png"
import avatar_chatbot from "@/assets/icons/avatar_chatbot.png"
import { COMMON_QUESTIONS } from "@/healper/data/chatbot";
import Input from "./input";
import { TypeChat } from "@/healper/type/chatbot-type";
const ListCommonQuestion = ({ text }: { text: string }) => (
  <Button style={styles.btn}>
    <Text style={styles.text_btn} className="font-pregular">{text}</Text>
  </Button>
)
const FrameChat = ({ id, content, role, }: TypeChat) => {
  return (
    <View style={styles.container_frame_chat}>
      <Text style={styles.text_frame_chat} className="font-pregular">{content}</Text>
    </View>)
}

const { width } = Dimensions.get('window'); // Lấy chiều rộng màn hình
function Chatbot() {
  const [chatData, setChatData] = React.useState<TypeChat[]>([]);
  const [valueInput, setValueInput] = React.useState<string>("");
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
  const handleSubmit = () => {
    setChatData([...chatData, {
      id: String(chatData.length),
      content: valueInput,
      role: "user"
    }])
  }
  return (
    <HeaderShown title="Trợ lí tư vấn"
      HeaderComponent={() => (
        <>
          <View style={styles.bg}>
            <Image source={bg} style={styles.bg_image} resizeMode="cover" />
          </View>
          <Input setValue={setValueInput} handleSubmit={handleSubmit} />
        </>
      )}
      rightIcon={{ image: more_icon, onPress: handleClickMoreInfor }}>
      <View style={styles.container_content}>
        <View style={styles.container_header}>
          <Image source={avatar_chatbot} />
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            contentContainerStyle={{ gap: 8, width: "100%", marginTop: 24, marginBottom: 100 }}
            columnWrapperStyle={{ gap: 8 }}
            data={COMMON_QUESTIONS}
            keyExtractor={(item: string) => item}
            renderItem={({ item }: { item: string }) => <ListCommonQuestion text={item} />} />
        </View>

        <FlatList
          style={styles.container_chat}
          scrollEnabled={false}
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: { item: TypeChat, index }) => <FrameChat {...item} />}
        />
      </View>
    </HeaderShown>
  );
}

const styles = StyleSheet.create({
  container_frame_chat: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  text_frame_chat: {
    fontSize: 16,
  },
  container_chat: {
    width: "100%",
    paddingVertical: 40,
    display: "flex",

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
    bottom: 0
  },
  bg_image: {
    width: "100%",
    height: "100%",
  }
})

export default Chatbot;
