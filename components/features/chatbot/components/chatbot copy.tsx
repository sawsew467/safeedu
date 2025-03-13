import { Button } from "@/components/ui/Button";
import axios from "axios";
import React, { useState } from "react";
import GlobalStyles from "@/components/ui/SafeViewAndroid";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Markdown from "react-native-markdown-display";
import {
  useCreateChatMutation,
  useCreateConversationMutation,
  useGetChatMessagesMutation,
} from "../queries/cozeQueries";

const ChatComponent = () => {
  const [text, onChangeText] = useState("Phân loại ma tuý");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [createConversation] = useCreateConversationMutation();
  const [createChat] = useCreateChatMutation();
  const [getChatMessages] = useGetChatMessagesMutation();

  const handleSendMessage = async () => {
    try {
      setLoading(true);
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
              content: text,
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
            setMessage(answer.content);
            setLoading(false);
          }
        } catch (error) {
          // console.log("Fetch error:", error);
        }
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: "100%" }}
      >
        <View>
          <TextInput onChangeText={onChangeText} value={text} />
          <Button onPress={handleSendMessage}>Send Message</Button>
          {loading ? <Text>Loading...</Text> : <Markdown>{message}</Markdown>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatComponent;
