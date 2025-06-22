import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { Redirect, SplashScreen, Stack, useRouter } from "expo-router";
import Providers from "@/providers";
import { View } from "react-native";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import LoadingPage from "@/components/ui/LoadingPage";
import { useAssets } from "expo-asset";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  const [assets, errorAsset] = useAssets([
    require("../assets/images/account/background.png"),
    require("../assets/images/game_images/gamePage_background.png"),
    require("../assets/images/contest/bg_1.png"),
    require("../assets/images/phone-verification-background.png"),
    require("../assets/images/contest/details/bg_leaderboard.png"),
  ]);

  useEffect(() => {
    if (error) throw error;
    if (errorAsset) throw errorAsset;

    if (fontsLoaded && assets) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error, errorAsset, assets]);

  if (!fontsLoaded) {
    return <View />;
  }
  if (!assets) {
    return <View />;
  }

  if (!assets && !errorAsset) {
    return <View />;
  }

  if (!fontsLoaded && !error) {
    return <View />;
  }
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="achiverment/index"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="contest/[contestID]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="contest/[contestID]/leaderboard"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="contest/[contestID]/drawPicture"
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="contest/[contestID]/drawPicture/[drawPictureID]"
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="news/[newsID]" options={{ headerShown: false }} />
        <Stack.Screen
          name="library/[libraryID]"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="leaderboard_game/[leaderboardID]"
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen name="game/[gameID]" options={{ headerShown: false }} /> */}
      </Stack>
    </Providers>
  );
};

export default RootLayout;
