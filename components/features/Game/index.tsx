import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';

function Game() {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
      <ScrollView >
        <Text>adwadawdawdawd</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Game;
