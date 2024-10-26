import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import Home from "@/assets/icons/nav_home.png";
import Library from "@/assets/icons/nav_library.png";
import Contest from "@/assets/icons/nav_contest.png";
import Game from "@/assets/icons/nav_game.png";
import Account from "@/assets/icons/nav_account.png";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
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
                icon={Home}
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
            title: "Library",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Library}
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
                icon={Contest}
                color={color}
                name="Cuộc thi"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="game"
          options={{
            title: "Game",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Game}
                color={color}
                name="Trò chơi"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={Account}
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
