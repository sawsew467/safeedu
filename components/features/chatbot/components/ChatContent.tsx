import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  useCreateChatMutation,
  useCreateConversationMutation,
  useGetChatMessagesMutation,
} from "../queries/cozeQueries";
// import { useExampleQuery, useGetAllCoursesQuery } from "../queries";
import { Button } from "@/components/ui/Button";
import HeaderShown from "@/components/ui/HeaderShown";
import bg from "@/assets/images/chatbox/bg.png";
import avatar_chatbot from "@/assets/icons/avatar_chatbot.png";
import { COMMON_QUESTIONS } from "@/healper/data/chatbot";
import Input from "./input";
import { TypeChat } from "@/healper/type/chatbot-type";
import Markdown from "react-native-markdown-display";
import * as Clipboard from "expo-clipboard";

import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import ReportDialog from "./report-dialog";

const ListCommonQuestion = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: (text: string) => void;
}) => (
  <Button style={styles.btn} onPress={() => handleClick(text)}>
    <Text style={styles.text_btn} className="font-pregular">
      {text}
    </Text>
  </Button>
);

const TabChat = ({ IconComponent, color, actions }) => (
  <TouchableOpacity
    onPress={() => actions()}
    className="flex items-center justify-center relative"
  >
    <IconComponent color={color} size={24} />
  </TouchableOpacity>
);

const { height, width } = Dimensions.get("window"); // Lấy chiều rộng màn hình
function ChatContent() {
  const [createConversation] = useCreateConversationMutation();
  const [createChat] = useCreateChatMutation();
  const [getChatMessages] = useGetChatMessagesMutation();

  const [{ statusLike, isReport }, setActions] = useState({
    statusLike: "none",
    isReport: false,
  });

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [chatData, setChatData] = useState<TypeChat[]>([]);
  const scrollViewRef = useRef(null);

  // console.log("🚀 ~ Chatbot ~ chatData:", chatData);

  const handleAddUserMessage = (content: string) => {
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        content: content,
        role: "user",
      },
    ]);
  };

  const tabActions = [
    {
      IconComponent: () =>
        statusLike !== "like" ? (
          <AntDesign name="like2" size={24} />
        ) : (
          <AntDesign name="like1" size={24} color="#75A815" />
        ),
      actions: () =>
        setActions((prev) => ({
          ...prev,
          statusLike: prev.statusLike === "like" ? "none" : "like",
        })),
    },
    {
      IconComponent: () =>
        statusLike !== "dislike" ? (
          <AntDesign name="dislike2" size={24} />
        ) : (
          <AntDesign name="dislike1" size={24} color="#75A815" />
        ),
      color: "black",
      actions: () =>
        setActions((prev) => ({
          ...prev,
          statusLike: prev.statusLike === "dislike" ? "none" : "dislike",
        })),
    },
    {
      IconComponent: () => <Feather name="copy" size={24} color="black" />,
      color: "black",
      actions: (e) => {
        Clipboard.setString(e);
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đã sao chép thành công! ✅",
          position: "top",
        });
      },
    },
    {
      IconComponent: () => <Octicons name="report" size={24} />,
      color: "black",
      actions: () => {
        setActions((prev) => ({ ...prev, isReport: true }));
      },
    },
  ];

  const FrameChat = ({
    content,
    role,
    isLoading,
    isEnd,
  }: TypeChat & { isLoading: boolean; isEnd: boolean }) => {
    if (isEnd && isLoading)
      return (
        <View
          style={[
            styles.content_frame_chat,
            { justifyContent: role === "user" ? "flex-end" : "flex-start" },
          ]}
        >
          {role === "chatbot" && (
            <>
              <Image source={avatar_chatbot} style={styles.avatar_chatbot} />
            </>
          )}
          <View
            style={[
              styles.frame_chat,
              role === "user" ? styles.user_style : styles.chatbot_style,
            ]}
          >
            <ActivityIndicator size="large" color="##75A815" />
          </View>
        </View>
      );
    return (
      <View style={styles.container_frame_chat}>
        <View
          style={[
            styles.content_frame_chat,
            { justifyContent: role === "user" ? "flex-end" : "flex-start" },
          ]}
        >
          {role === "chatbot" && (
            <>
              <Image source={avatar_chatbot} style={styles.avatar_chatbot} />
            </>
          )}
          <View
            style={[
              styles.frame_chat,
              role === "user" ? styles.user_style : styles.chatbot_style,
            ]}
          >
            <Text style={styles.text_frame_chat} className="font-pregular">
              {role === "chatbot" ? (
                <Markdown
                  style={{
                    body: {
                      color: "#000",
                      display: "flex",
                      flexWrap: "wrap",
                      flex: 1,
                      width: width * 0.7,
                    },
                  }}
                >
                  {content}
                </Markdown>
              ) : (
                content
              )}
            </Text>
          </View>
        </View>
        {role === "chatbot" && (
          <View style={styles.container_action}>
            {tabActions?.map(({ IconComponent, color, actions }) => (
              <TabChat
                IconComponent={IconComponent}
                color={color}
                actions={() => actions(content)}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const handleDialog = (status: "cancel" | "send") => {
    if (status === "send") {
      Toast.show({
        type: "success",
        text1: "Báo cáo thành công",
        text2: "Cảm ơn bạn đã báo cáo vi phạm",
      });
    }
    setActions((prev) => ({
      ...prev,
      isReport: false,
    }));
  };

  const handleAddBotMessage = (content: string) => {
    if (content) {
      setChatData((prevData) => {
        const data = prevData;
        data.splice(prevData.length - 1, 1);
        return [
          ...data,
          {
            content: content,
            role: "chatbot",
          },
        ];
      });
    } else {
      setChatData((prevData) => [
        ...prevData,
        {
          content: content,
          role: "chatbot",
        },
      ]);
    }
  };
  const handleSendMessage = async (content: string) => {
    try {
      setLoading(true);
      handleAddUserMessage(content);
      handleAddBotMessage("");
      const conversationResponse = await createConversation().unwrap();
      const { id: conversationId } = conversationResponse.data;

      const chatResponse = await createChat({
        params: {
          conversation_id: conversationId,
        },
        data: {
          bot_id: "7430824648633745415",
          user_id: "7361642627714876433",
          auto_save_history: true,
          additional_messages: [
            {
              role: "user",
              content: content,
              content_type: "text",
            },
          ],
        },
      }).unwrap();
      const { id: chatId } = chatResponse.data;

      const intervalId = setInterval(async () => {
        try {
          const messagesResponse = await getChatMessages({
            params: {
              chat_id: chatId,
              conversation_id: conversationId,
            },
          });
          const messages = messagesResponse.data.data;
          // console.log("🚀 ~ intervalId ~ messages:", messages);

          if (messages.length > 1) {
            clearInterval(intervalId);
            const [answer] = messages;
            // console.log("Message content:", answer.content);
            handleAddBotMessage(answer.content);
            setLoading(false);
          }
        } catch (error) {
          // console.log("Fetch error:", error);
        }
      }, 1000);
    } catch (error) {}
  };
  return (
    <>
      <HeaderShown
        isBack={false}
        title="Trợ lí tư vấn"
        ref={scrollViewRef}
        style={{ paddingBottom: 120, flexGrow: 1 }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef?.current?.scrollTo({
            x: 0,
            y: contentHeight,
            animated: true,
          });
        }}
        FooterComponent={() => <Input handleSubmit={handleSendMessage} />}
        // rightIcon={{
        //     icon: () => <Feather name="more-horizontal" size={24} color="black" />,
        //     onPress: handleClickMoreInfor,
        // }}
      >
        <View style={styles.container_content}>
          <View style={styles.container_header}>
            <Image source={avatar_chatbot} />
            {chatData.length === 0 && (
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                contentContainerStyle={{
                  gap: 8,
                  width: "100%",
                  marginTop: 24,
                  marginBottom: 20,
                }}
                columnWrapperStyle={{ gap: 8 }}
                data={COMMON_QUESTIONS}
                keyExtractor={(item: string) => item}
                renderItem={({ item }: { item: string }) => (
                  <ListCommonQuestion
                    handleClick={handleSendMessage}
                    text={item}
                  />
                )}
              />
            )}
          </View>
          <FlatList
            contentContainerStyle={styles.container_chat}
            scrollEnabled={false}
            data={chatData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({
              item,
              index,
            }: {
              item: TypeChat;
              index: number;
            }) => (
              <FrameChat
                {...item}
                isLoading={loading}
                isEnd={index + 1 === chatData.length && item.role === "chatbot"}
              />
            )}
          />
        </View>
      </HeaderShown>
      <ReportDialog
        visible={isReport}
        handleDialog={handleDialog}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container_frame_chat: {},
  container_action: {
    marginTop: 20,
    paddingInline: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 20,
  },
  btn_more: {
    borderWidth: 0,
    borderColor: "none",
  },
  text_frame_chat: {
    color: "#fff",
    flex: 1,
  },
  avatar_chatbot: {
    width: 32,
    height: 32,
  },
  user_style: {
    borderBottomEndRadius: 4,
    backgroundColor: "#75A815",
    alignSelf: "flex-start",
    flexGrow: 0,
    maxWidth: "75%",
    padding: 12,
  },
  chatbot_style: {
    backgroundColor: "#F2F2F2",
    borderBottomStartRadius: 4,
    alignSelf: "flex-start",
    flexGrow: 0,
    maxWidth: "80%",
    padding: 12,
  },
  frame_chat: {
    padding: 12,

    borderRadius: 16,
  },
  content_frame_chat: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
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
    width: "100%",
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
    backgroundColor: "#F2F2F2",
  },
  container_header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container_content: {
    marginTop: 20,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
  },
  bg_image: {
    width: "100%",
    height: "100%",
  },
});

export default ChatContent;
