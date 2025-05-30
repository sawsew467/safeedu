import HeaderShown from "@/components/ui/HeaderShown";
import React from "react";
import { ImageBackground } from "react-native";
import bg_game_1 from "@/assets/images/game_images/gamePage_background.png";
import { View } from "moti";
import QuizModule from "./QuizModule";

const QuizBackground = () => {
  return (
    <>
      <HeaderShown
        title="Cuộc thi Lý thuyết"
        className="flex-1 h-full"
        isScroll={false}
        HeaderComponent={() => (
          <View className="z-0 absolute bottom-0 top-0 left-0 right-0">
            <ImageBackground
              source={bg_game_1}
              defaultSource={bg_game_1}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
        )}
      >
        <QuizModule />
      </HeaderShown>
    </>
  );
};

export default QuizBackground;
