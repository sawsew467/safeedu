import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs, useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "@/hooks/redux";
import {
  BookIcon,
  BotMessageSquareIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react-native";

const TabIcon = ({ IconComponent, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center relative w-64">
      <IconComponent color={color} size={24} />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs text-center mt-2 `}
        style={{ color: color }}
      >
        {name}
      </Text>
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

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default TabLayout;
