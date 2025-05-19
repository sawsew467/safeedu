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
import uuid from "react-native-uuid";

import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import ReportDialog from "./report-dialog";

interface Attachment {
  name?: string;
  contentType?: string;
  url: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
}

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
    <IconComponent color={color} size={10} />
  </TouchableOpacity>
);

const ErrorScreen = ({ onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Cuộc trò chuyện bị gián đoạn vì một số lỗi không mong muốn. Xin hãy tải
        lại!!!
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Ionicons name="refresh" size={24} color="red" />
        <Text style={styles.retryText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const { height, width } = Dimensions.get("window"); // Lấy chiều rộng màn hình
function ChatContent() {
  const [createConversation] = useCreateConversationMutation();
  const [createChat, { isError: isErrorCreateChat }] = useCreateChatMutation();
  const [getChatMessages, { isError: isErrorCreateMessage }] =
    useGetChatMessagesMutation();

  const [error, setError] = useState(false);

  const [{ isReport }, setActions] = useState({
    isReport: false,
  });

  const [statusLike, setStatusLike] = useState({});

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [chatData, setChatData] = useState<TypeChat[]>([]);
  const scrollViewRef = useRef(null);

  const [input, setInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("🚀 ~ ChatContent ~ messages:", messages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessageeee = async (userMessage: string) => {
    console.log("🚀 ~ handleSendMessageeee ~ userMessage:", userMessage);
    if (!userMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      images: imageUrls.map((img) => img.url),
    };

    let tempMessages = [...messages, newUserMessage];

    setMessages(tempMessages);
    setIsLoading(true);

    const chatHistory = [...messages, newUserMessage];
    console.log("🚀 ~ handleSendMessageeee ~ chatHistory:", chatHistory);

    setImageUrls([]);

    fetch("https://www.safe-edu.site/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory, images: imageUrls }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("🚀 ~ .then ~ data:", data);
        const rawContent =
          data?.choices?.[0]?.message?.content || data?.content || "";

        const assistantMessage: Message = {
          id: Date.now().toString() + "-assistant",
          role: "assistant",
          content: rawContent,
        };

        tempMessages = [...tempMessages, assistantMessage];

        setMessages(tempMessages);
      })
      .catch((err) => {
        console.log("🚀 ~ handleSendMessage ~ err:", err);
        const errorMessage: Message = {
          id: Date.now().toString() + "-error",
          role: "assistant",
          content:
            "Có lỗi xảy ra, vui lòng thử lại sau hoặc tạo sự cố trực tiếp cho bộ phận hỗ trợ",
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (input: string) => {
    const userInput = input.trim();

    if (userInput && !isLoading) {
      console.log("🚀 ~ handleSubmit ~ userInput:", userInput);

      handleSendMessageeee(userInput);
      setInput("");
    }
  };

  const handleAddUserMessage = (content: string) => {
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        content: content,
        role: "user",
        id_message: uuid.v4(),
      },
    ]);
  };

  const tabActions = [
    {
      name: "like",
      IconComponent: (id: string) =>
        statusLike?.[id]?.status !== "like" ? (
          <AntDesign name="like2" size={16} />
        ) : (
          <AntDesign name="like1" size={16} color="#75A815" />
        ),
      actions: (_, id: string) => {
        setStatusLike((prev) => ({
          ...prev,
          [id]: {
            status: prev?.[id]?.status === "like" ? "none" : "like",
          },
        }));
      },
    },
    {
      name: "dislike",
      IconComponent: (id: string) =>
        statusLike?.[id]?.status !== "dislike" ? (
          <AntDesign name="dislike2" size={16} />
        ) : (
          <AntDesign name="dislike1" size={16} color="#DD2222" />
        ),
      color: "black",
      actions: (_, id: string) =>
        setStatusLike((prev) => ({
          ...prev,
          [id]: {
            status: prev?.[id]?.status === "dislike" ? "none" : "dislike",
          },
        })),
    },
    {
      name: "copy",
      IconComponent: () => <Feather name="copy" size={16} color="black" />,
      color: "black",
      actions: (content: string) => {
        Clipboard.setString(content);
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đã sao chép thành công! ✅",
          position: "top",
        });
      },
    },
    {
      name: "report",
      IconComponent: () => <Octicons name="report" size={16} />,
      color: "black",
      actions: () => {
        setActions((prev) => ({ ...prev, isReport: true }));
      },
    },
  ];

  const FrameChat = ({
    content,
    error,
    role,
    isLoading,
    isEnd,
    id_message,
  }: TypeChat & { isLoading: boolean; isEnd: boolean; error: boolean }) => {
    console.log("🚀 ~ FrameChat ~ isLoading:", isLoading);

    if (isEnd && isLoading)
      return (
        <View
          style={[
            styles.content_frame_chat,
            { justifyContent: role === "user" ? "flex-end" : "flex-start" },
          ]}
        >
          {role === "assistant" && (
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
          {role === "assistant" && (
            <>
              <Image source={avatar_chatbot} style={styles.avatar_chatbot} />
            </>
          )}
          <View
            style={[
              styles.frame_chat,
              role === "user" ? styles.user_style : styles.chatbot_style,
              role === "assistant" &&
                error &&
                isEnd && {
                  backgroundColor: "#f8a5a5",
                  borderWidth: 1,
                  borderColor: "#ff3535",
                },
            ]}
          >
            <Text style={styles.text_frame_chat} className="font-pregular">
              {role === "assistant" ? (
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
        {role === "assistant" && (
          <View style={styles.container_action}>
            {tabActions?.map(
              ({ IconComponent, color, actions }, index: number) => (
                <TabChat
                  IconComponent={() => IconComponent(id_message)}
                  color={color}
                  actions={() => actions(content, id_message)}
                />
              )
            )}
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

  const handleAddBotMessage = (content: string, id_message: string | null) => {
    if (content) {
      setChatData((prevData) => {
        const data = prevData;
        data.splice(prevData.length - 1, 1);
        return [
          ...data,
          {
            content: content,
            role: "assistant",
            id_message,
          },
        ];
      });
      setStatusLike((prev) => ({
        ...prev,
        [id_message]: {
          status: "none",
        },
      }));
    } else {
      setChatData((prevData) => [
        ...prevData,
        {
          content: content,
          role: "assistant",
          id_message,
        },
      ]);
    }
  };
  const handleSendMessage = async (content: string) => {
    try {
      setLoading(true);
      handleAddUserMessage(content);
      handleAddBotMessage("", null);
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
      if (chatResponse.code != 0) {
        setError(true);
        setLoading(false);
        handleAddBotMessage("Đã có lỗi xảy ra", uuid.v4());
        return;
      }
      const { id: chatId } = chatResponse?.data;
      let count = 0;
      const intervalId = setInterval(async () => {
        try {
          const messagesResponse = await getChatMessages({
            params: {
              chat_id: chatId,
              conversation_id: conversationId,
            },
          });
          const messages = messagesResponse.data.data;
          count++;
          if (count > 15) {
            handleAddBotMessage("Đã có lỗi xảy ra", uuid.v4());
            setError(true);
            setLoading(false);
            clearInterval(intervalId);
            count = 0;
          }

          if (messages.length > 1) {
            clearInterval(intervalId);
            const [answer] = messages;
            handleAddBotMessage(answer.content, answer.id);
            setLoading(false);
          }
        } catch {
          // console.log("Fetch error:", error);
        }
      }, 1000);
    } catch {}
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
        FooterComponent={() =>
          error ? (
            <ErrorScreen
              onRetry={() => {
                setChatData([]);
                setError(false);
              }}
            />
          ) : (
            <Input handleSubmit={handleSubmit} />
          )
        }
        // rightIcon={{
        //     icon: () => <Feather name="more-horizontal" size={24} color="black" />,
        //     onPress: handleClickMoreInfor,
        // }}
      >
        <View style={styles.container_content}>
          <View style={styles.container_header}>
            <Image source={avatar_chatbot} />
            {messages.length === 0 && (
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
                    handleClick={handleSendMessageeee}
                    text={item}
                  />
                )}
              />
            )}
          </View>
          <FlatList
            contentContainerStyle={styles.container_chat}
            scrollEnabled={false}
            data={messages}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }: { item: Message; index: number }) => (
              <FrameChat
                {...item}
                error={error}
                isLoading={isLoading}
                isEnd={
                  index + 1 === messages.length && item.role === "assistant"
                }
                id_message={item.role === "assistant" && item.id}
              />
            )}
          />
          {isLoading && (
            <View style={styles.container_chat}>
              <FrameChat
                content={""}
                error={error}
                role={"assistant"}
                isLoading={isLoading}
                isEnd={true}
                id_message={uuid.v4()}
              />
            </View>
          )}
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    height: 20,
    maxHeight: 100,
  },
  errorText: {
    fontSize: 16,
    color: "#721c24",
    textAlign: "center",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  retryText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#ff0000",
  },
  container_frame_chat: {},
  container_action: {
    marginTop: 8,
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
