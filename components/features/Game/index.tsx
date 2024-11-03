import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
import { router } from "expo-router";

function Game() {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
      <ScrollView >
        <TouchableHighlight onPress={() => { router.push("/game/1") }}>
          <Text>Go to game</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Game;
