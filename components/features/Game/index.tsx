import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Game() {
  return (
    // <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
    <>
      <View style={styles.backgroundContainer}>
        <Image style={styles.backgroundImage} source={require('assets/images/game_images/gamePage_background.png')} />
      </View>
      <View style={styles.pageContainer}>
        <ScrollView bounces={false} >
          <View style={styles.header}>
            <Text style={styles.headerText}>Trò Chơi Giải Trí</Text>
          </View>
        </ScrollView>
      </View>
    </>
    // </SafeAreaView>
  );
}

export default Game;

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pageContainer: {
    paddingTop: windowHeight * 0.08,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 38.4,
    textAlign: "center",
    color: "#FFFFFF"
  },
})
