import HeaderShown from "@/components/ui/HeaderShown";
import React from "react";
import { ImageBackground } from "react-native";
import bg_game_1 from "@/assets/images/game_images/gamePage_background.png";

const QuizBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderShown
      title="Cuộc thi Lý thuyết"
      className="flex-1"
      isScroll={false}
      HeaderComponent={() => (
        <ImageBackground
          source={bg_game_1}
          defaultSource={bg_game_1}
          resizeMode="cover"
          className="z-0 absolute bottom-0 top-0 left-0 right-0"
        />
      )}
    >
      {children}
    </HeaderShown>
  );
};

export default QuizBackground;
