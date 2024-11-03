import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";
import Providers from "@/providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
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

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="achiverment/index" options={{ headerShown: false }} />
      <Stack.Screen name="contest/[contestID]" options={{ headerShown: false }} />
      <Stack.Screen name="contest/[contestID]/leaderboard" options={{ headerShown: false }} />
      <Stack.Screen name="contest/[contestID]/drawPicture" options={{ headerShown: false }} />
      <Stack.Screen name="contest/[contestID]/drawPicture/[drawPictureID]" options={{ headerShown: false }} />
      <Stack.Screen name="news/[newsID]" options={{ headerShown: false }} />
      <Stack.Screen name="library/[libraryID]" options={{ headerShown: false }} />
      <Stack.Screen name="leaderboard_game/[leaderboardID]" options={{ headerShown: false }} />
      <Stack.Screen name="game/[gameID]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
