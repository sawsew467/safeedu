import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useExampleQuery, useGetAllCoursesQuery } from "../queries";
import { usePostChatMessageMutation } from "../queries/cozeQueries";
import { Button } from "@/components/ui/Button";

function Chatbot() {
  const { data } = useGetAllCoursesQuery();
  console.log("🚀 ~ Chatbot ~ data:", data);
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
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <Text>Chatbot module</Text>
        <Button
        // onPress={handleSendMessage}
        >
          Send message
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Chatbot;
