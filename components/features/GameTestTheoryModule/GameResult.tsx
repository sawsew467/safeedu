import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import trophy_image from "@/assets/images/game_images/trophy_image.png";
import { router, useLocalSearchParams } from "expo-router";
import ProgressScore from "./circleResult";
const GameResult = () => {
  const params = useLocalSearchParams();
  const data = JSON.parse(params.item as string);
  const renderText = () => {
    const percent = data?.correctAnswer / data?.totalQuizz;
    if (percent < 0.5) return "Hãy cố gắng thêm nhé!";
    if (percent < 0.8) return "Tuyệt! Sắp trả lời đúng hết rồi!";
    if (percent < 1) return "Tuyệt! Bạn đã trả lời gần đúng hết!";
    return "Tuyệt! Bạn đã trả lời đúng hết!";
  };
  const renderColor = () => {
    const percent = data?.correctAnswer / data?.totalQuizz;
    if (percent < 0.5) return "#F44336";
    if (percent < 0.8) return "#FFC107";
    if (percent < 1) return "#4CAF50";
    return "#4CAF50";
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, { color: renderColor() }]}>
            {renderText()}
          </Text>
          <View style={styles.headerImageContainer}>
            <Image style={styles.headerImage} source={trophy_image} />
          </View>
        </View>
        <Text style={styles.result}>Kết quả của bạn</Text>
        <View style={styles.container_result}>
          <View style={styles.circle_result}>
            <ProgressScore
              percent={(data?.correctAnswer / data?.totalQuizz) * 100}
            />
          </View>
          <View style={styles.content_result}>
            <View style={styles.container_text_result}>
              <Text style={styles.correct_text}>Đúng</Text>
              <View style={styles.correct_circle}>
                <Text style={styles.correct_circle_text}>
                  {data?.correctAnswer}
                </Text>
              </View>
            </View>
            <View style={styles.container_text_result}>
              <Text style={styles.incorrect_text}>Sai</Text>
              <View style={styles.incorrect_circle}>
                <Text style={styles.incorrect_circle_text}>
                  {data?.totalQuizz - data?.correctAnswer}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", gap: 10 }}>
          <TouchableHighlight
            underlayColor={"#75A815"}
            onPress={() => {
              router.replace("game/1");
            }}
            style={styles.btn_outline}
          >
            <Text style={styles.text_btn_outline}>Làm lại</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#fff"}
            onPress={() => {
              router.replace("game");
            }}
            style={styles.btn}
          >
            <Text style={styles.text_btn}>Trờ về trang chủ</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameResult;

const styles = StyleSheet.create({
  text_btn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  text_btn_outline: {
    color: "#75A815",
    fontSize: 20,
    fontWeight: "700",
  },
  btn: {
    width: "100%",
    backgroundColor: "#75A815",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  btn_outline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#75A815",
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  correct_circle: {
    borderRadius: 999,
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#75A815",
    backgroundColor: "#75A81566",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  incorrect_circle: {
    borderRadius: 999,
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#CD0A09",

    backgroundColor: "#CD0A0966",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  correct_circle_text: {
    color: "#75A815",
    fontWeight: "700",
  },
  incorrect_circle_text: {
    color: "#CD0A09",
    fontWeight: "700",
  },
  container_text_result: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container_result: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incorrect_text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CD0A09",
  },
  correct_text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#03622F",
  },
  content_result: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    height: 80,
    gap: 12,
  },
  circle_result: {
    width: 150,
    height: 150,
  },
  result: {
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    marginVertical: 40,
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 40,
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    width: "60%",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
  },
  headerImageContainer: {
    width: 90,
    aspectRatio: 90 / 100,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
