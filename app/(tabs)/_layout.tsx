import React, { useEffect } from "react";

import { Tabs } from "expo-router";
import { View, StatusBar } from "react-native";

import { useAppDispatch } from "@/hooks/redux";
import {
  BookIcon,
  BotMessageSquareIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "@/settings/constants";
import {
  setAccessToken,
  setNotifycaUpdateProfile,
  setRefreshToken,
} from "@/components/features/auth/slices";

const TabIcon = ({ IconComponent, color, name, focused }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(constants.ACCESS_TOKEN);
      dispatch(setAccessToken(token));
    })();
    (async () => {
      const token = await AsyncStorage.getItem(constants.REFRESH_TOKEN);
      dispatch(setRefreshToken(token));
    })();
    (async () => {
      const notification = await AsyncStorage.getItem(
        constants.NOTIFYCA_UPDATE_PROFILE
      );
      dispatch(
        setNotifycaUpdateProfile(notification === "false" ? false : true)
      );
    })();
  }, []);

  return (
    <View className="flex items-center justify-center flex-1">
      <IconComponent color={color} size={24} />
      {/* <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs text-center mt-2 `}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabLayout = () => {
  // const { access_token } = useAppSelector((state) => state.auth);
  // const router = useRouter();
  // React.useEffect(() => {
  //   if (!access_token) {
  //     router.replace("/sign-in");
  //   }
  // }, [access_token]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#75A815",
          tabBarInactiveTintColor: "#00000080",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#00000080",
            height: 84,
            paddingTop: 16,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <HomeIcon width={24} height={24} color={color} />
                )}
                color={color}
                name="Trang chủ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Thư viện",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <BookIcon width={24} height={24} color={color} />
                )}
                color={color}
                name="Thư viện"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="contest"
          options={{
            title: "Contest",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <TrophyIcon width={24} height={24} color={color} />
                )}
                color={color}
                name="Cuộc thi"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: "chatbot",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <BotMessageSquareIcon width={24} height={24} color={color} />
                )}
                color={color}
                name="Chat bot"
                focused={focused}
              />
            ),
          }}
        />

        {/*
        <Tabs.Screen
          name="notifications"
          options={{
            title: "thông báo",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <Bell width={24} height={24} color={color} />
                )}
                color={color}
                name="thông báo"
                focused={focused}
              />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="game"
          options={{
            title: "Game",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <Ionicons
                    name="game-controller-outline"
                    size={24}
                    color={color}
                  />
                )}
                color={color}
                name="Trò chơi"
                focused={focused}
              />
            ),
          }}
        />*/}
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => (
                  <UserIcon width={24} height={24} color={color} />
                )}
                color={color}
                name="Tài khoản"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
