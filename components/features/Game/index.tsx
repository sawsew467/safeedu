import React from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
import { GAME_DATA } from "@/healper/data/game";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Game() {
  return (
    // <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
    <>
      <View style={styles.background}>
        <Image style={styles.backgroundImage} source={require('assets/images/game_images/gamePage_background.png')} />
      </View>
      <View style={styles.container}>
        <ScrollView bounces={false} >

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Trò Chơi Giải Trí</Text>
          </View>

          <View style={styles.whiteBoardContainer}>

            <View style={styles.sectionContainer}>
              <View style={styles.memoryGameInfo}>
                <View style={styles.memoryGameTextContainer}>
                  <Text style={styles.memoryGameTitle}>Trò chơi ghi nhớ</Text>
                  <Text style={styles.memoryGameDescription}>Luyện tập về các câu hỏi phòng tránh ma túy ngay nào</Text>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText} numberOfLines={1} className="font-pbold">Bắt đầu</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.memoryGameCardContainer}>
                <Image style={styles.memoryGameImage} source={require('assets/images/game_images/game_image_1.png')} />
                <View style={styles.overlayBackgroundContainer}>
                  <Image style={styles.overlayBackgroundImage} source={require('assets/images/game_images/text_container_overlay_green_image.png')} />
                </View>
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText} numberOfLines={1} className="font-pbold">Cóc leo mây</Text>
                </View>
              </View>
            </View>

          </View>

          <View style={styles.whiteBoardContainer}>

            <View style={styles.challengeGameHeader}>
              <View style={styles.challengeGameEmojiContainer}>
                <Image style={styles.challengeGameEmoji} source={require('assets/icons/emoji_fire_.png')} />
              </View>
              <Text style={styles.challengeGameTitle}>Trò Chơi Thử Thách</Text>
            </View>

            <View style={styles.gameListContainer}>
              <FlatList
                overScrollMode="never"
                scrollEnabled={false}
                data={GAME_DATA}
                numColumns={2}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.challengeGameCardList}
                contentContainerStyle={{ gap: 24, paddingHorizontal: 20, paddingVertical: 10, }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.challengeGameCardContainer}>
                    <Image style={styles.challengeGameImage} source={item.image} />
                    <View style={styles.challengeGameOverlayBackgroundContainer}>
                      <Image style={styles.challengeGameOverlayBackgroundImage} source={require('assets/images/game_images/text_container_overlay_green_image.png')} />
                    </View>
                    <View style={styles.challengeGameOverlayTextContainer}>
                      <Text style={styles.challengeGameOverlayText} numberOfLines={1} className="font-pbold">{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

          </View>

        </ScrollView>
      </View>
    </>
    // </SafeAreaView>
  );
}

export default Game;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    // paddingVertical: 60,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 38.4,
    textAlign: "center",
    color: "#FFFFFF"
  },
  whiteBoardContainer: {
    width: "100%",
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  memoryGameInfo: {
    display: "flex",
    gap: 20,
  },
  memoryGameTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: windowWidth - 200, // 232
    // height: 85,
    gap: 8,
  },
  memoryGameTitle: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 23,
    color: "#07743A",
  },
  memoryGameDescription: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24.75,
    color: "#75A815",
  },
  startButton: {
    // width: 120,
    // flex: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#75A815",
    justifyContent: "center",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 12,
    shadowOpacity: 0.12,
    elevation: 10,
  },
  startButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
  },

  memoryGameCardContainer: {
    width: 110, //110
    height: 130, //130
    position: "relative",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    shadowOpacity: 0.18,
    elevation: 10,
  },
  memoryGameImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  overlayBackgroundContainer: {
    position: "absolute",
    // zIndex: 1,
    bottom: -52,
    width: 110,
    height: 130,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  overlayBackgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 4,
    left: 15,
  },
  overlayText: {
    fontSize: 14,
    lineHeight: 16.41,
    color: "#FFFFFF",
    // position: "absolute",
  },
  challengeGameHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center"
    marginTop: 20,
    marginHorizontal: 20,
  },
  challengeGameEmojiContainer: {
    width: 28,
    height: 32,
    marginRight: 8,
  },
  challengeGameEmoji: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  challengeGameTitle: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 23.44,
    color: "#03622F",
  },
  gameListContainer: {
    // paddingHorizontal: 20,
    // marginTop: 8,
    // paddingVertical: 32,
    // marginBottom: 40,
  },
  challengeGameCardList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // gap: 24,
  },
  challengeGameCardContainer: {
    width: "45%",
    aspectRatio: 164 / 188,
    position: "relative",
    // borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.18,
    elevation: 10,
  },
  challengeGameImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,

  },
  challengeGameOverlayBackgroundContainer: {
    width: "100%",
    aspectRatio: 164 / 42,
    position: "absolute",
    bottom: -4,
  },
  challengeGameOverlayBackgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  challengeGameOverlayTextContainer: {
    position: 'absolute',
    bottom: 3,
    left: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeGameOverlayText: {
    fontSize: 16,
    lineHeight: 18.75,
    color: "#FFFFFF",
  }
})
